import { ArticleModule } from "@/api/modules/article";

class Api {
  public static instance = new Api();

  public readonly article: ArticleModule = new ArticleModule();
}

export default Api;
