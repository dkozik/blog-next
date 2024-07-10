import { IArticle, IArticleComment, IListResponse } from "@/core/types";
import { Config } from "@/core/config";
import { Query } from "@/api/query";
import { IPostArticleCommentRequest } from "@/api/types/request";

export class ArticleModule {
  constructor(private readonly query = new Query()) {}
  async loadList(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IListResponse<IArticle>> {
    return await this.query.get(`${Config.apiBaseUrl}/article/list`, {
      page: `${page}`,
      pageSize: `${pageSize}`,
    });
  }

  async loadArticle(
    id: number | string,
    withComments: boolean = false,
  ): Promise<IArticle> {
    try {
      return await this.query.get(`${Config.apiBaseUrl}/article/${id}`, {
        comments: Boolean(withComments),
      });
    } catch (error) {
      return null;
    }
  }

  async loadArticleComments(articleId: IArticle["id"]) {
    return await this.query.get(
      `${Config.apiBaseUrl}/article/${articleId}/comments`,
      {},
    );
  }

  async postComment(
    articleId: IArticle["id"],
    request: IPostArticleCommentRequest,
  ) {
    await this.query.post(
      `${Config.apiBaseUrl}/article/${articleId}/comments`,
      {
        body: request,
      },
    );
  }
}
