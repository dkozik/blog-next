export interface IArticleComment {
  id: string;
  body: string;
}

export interface IArticle {
  id: string;
  imageThumbSrc: string;
  imageSrc: string;
  title: string;
  body: string;
}

export interface IArticleWithComments extends IArticle {
  comments: IArticleComment[];
}

export interface IListResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}
