export interface IArticle {
  id: string;
  imageSrc: string;
  title: string;
  body: string;
}

export interface IListResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}
