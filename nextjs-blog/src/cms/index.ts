import { IArticle, ICMSResponse, IListResponse } from "@/core/types";
import { IPostArticleCommentRequest } from "@/api/types/request";

export class CMS {
  private baseURL = process.env.CMS_BASE_URL;
  private imgBaseURL = process.env.IMG_BASE_URL;
  public static instance = new CMS();

  public async loadArticles(
    page: number,
    pageSize: number,
  ): Promise<ICMSResponse<IListResponse<IArticle>>> {
    const params = new URLSearchParams({
      populate: "*",
    });
    if (page > 0) {
      params.set("pagination[page]", String(page));
    }
    if (pageSize > 0) {
      params.set("pagination[pageSize]", String(pageSize));
    }
    const { data, meta, error } = await this.get("/posts", params.toString());

    const {
      page: outPage,
      pageSize: outPageSize,
      total: outTotal,
    } = meta?.pagination || {};

    const resData = {
      page: outPage,
      pageSize: outPageSize,
      total: outTotal,
      hasMore: Boolean(outPage * outPageSize < outTotal),
      data: data.map((blog) => {
        const { thumbnail, medium, small, large } =
          blog.attributes.media.data.attributes.formats;

        return {
          id: blog.id,
          body: blog.attributes.body,
          title: blog.attributes.title,
          imageThumbSrc: thumbnail
            ? `${this.imgBaseURL}${thumbnail.url}`
            : null,
          imageSrc: large ? `${this.imgBaseURL}${large.url}` : null,
        };
      }),
    } as IListResponse<IArticle>;

    return { data: resData, error };
  }

  public async loadSingleArticle(
    id: string,
    withComments: boolean = false,
  ): Promise<ICMSResponse<IArticle>> {
    const params = new URLSearchParams({
      populate: withComments ? "media,comments" : "media",
    });
    const {
      data: article,
      meta,
      error,
    } = await this.get(`/posts/${id}`, params.toString());

    if (error?.status) {
      return { data: null, error };
    }

    const { thumbnail, medium, small, large } =
      article.attributes.media?.data?.attributes.formats || {};

    const res: IArticle = {
      id: article.id,
      title: article.attributes.title,
      body: article.attributes.body,
      imageThumbSrc: thumbnail ? `${this.imgBaseURL}${thumbnail.url}` : null,
      imageSrc: large ? `${this.imgBaseURL}${large.url}` : null,
    };
    return { data: res, error: null };
  }

  public async loadArticleComments(
    articleId: string,
  ): Promise<ICMSResponse<any>> {
    // http://localhost:1337/api/comments?populate[post][fields]=id&filters[post][id]=7&sort[0]=createdAt

    const { data: comments, error } = await this.get(
      `/comments`,
      `filters[post][id]=${articleId}&sort[0]=createdAt`,
      // `populate[post][fields]=id&filters[post][id]=${articleId}&sort[0]=createdAt`,
    );

    if (error?.status) {
      return { data: null, error };
    }

    return {
      data: comments.map((item) => ({
        ...item.attributes,
        id: item.id,
      })),
      error: null,
    };
  }

  public async postComment(
    articleId: string,
    comment: IPostArticleCommentRequest,
  ) {
    const requestBody = {
      data: {
        body: comment.body,
        post: articleId,
      },
    };

    await fetch(`${this.baseURL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(requestBody),
    });
  }

  private async get(url: string, paramsString?: string) {
    // http://localhost:1337/api/posts?populate=*
    // http://localhost:1337/api/posts?fields[0]=title&populate[0]=media
    // http://localhost:1337/api/posts?populate=media
    // http://localhost:1337/api/posts/1
    const finalUrl = [`${this.baseURL}${url}`, paramsString]
      .filter(Boolean)
      .join("?");

    const res = await fetch(finalUrl);
    return await res.json();
  }
}
