export interface IArticleComment {
  id: string;
  body: string;
}

export interface IArticle {
  id: string;
  imageThumbSrc: string | null;
  imageSrc: string | null;
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
  hasMore: boolean;
  data: T[];
}

export interface ICMSResponse<T> {
  data: T | null;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}
