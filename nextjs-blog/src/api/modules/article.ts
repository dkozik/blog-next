import { IArticle, IListResponse } from "@/core/types";
import { Config } from "@/core/config";

export class ArticleModule {
  async loadList(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IListResponse<IArticle>> {
    const params = new URLSearchParams({
      page: `${page}`,
      pageSize: `${pageSize}`,
    });
    const response = await fetch(
      `${Config.apiBaseUrl}/article/list?${params.toString()}`,
    );
    return await response.json();
  }

  async loadArticle(id: number): Promise<IArticle> {
    const response = await fetch(`${Config.apiBaseUrl}/article/${id}`);
    return await response.json();
  }
}
