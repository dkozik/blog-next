import { IArticle, IArticleComment } from "@/core/types";
import { article, sentence } from "@ndaidong/txtgen";

const GENERATION_COUNT = 100;

type TMockDataIndex = Record<IArticle["id"], IArticle>;

let threadCache;

if (process.env.NODE_ENV === "production") {
  threadCache = {
    idIndex: 10,
  };
} else {
  if (!global.threadCache) {
    global.threadCache = {
      idIndex: 10,
    };
  }

  threadCache = global.threadCache;
}

const nextId = (() => {
  return () => ++threadCache.idIndex;
})();

const nextIdStr = () => {
  return String(nextId());
};

function makeData(count: number = 10): Array<IArticle> {
  const data = new Array<IArticle>(count).fill(null).map(() => {
    const res: IArticle = {
      id: nextIdStr(),
      title: sentence(),
      body: article(1 + Math.floor(Math.random() * 2)),
      imageThumbSrc: `https://dummyimage.com/160x150/666/fff`,
      imageSrc: `https://dummyimage.com/600x450/666/fff`,
    };

    return res;
  });

  return data;
}

function makeIndex(dataIn: IArticle[]): TMockDataIndex {
  return dataIn.reduce((acc: TMockDataIndex, article: IArticle) => {
    acc[article.id] = article;
    return acc;
  }, {} as TMockDataIndex);
}

function makeComments(count: number = 1): IArticleComment[] {
  const res: IArticleComment[] = [];
  for (let i = 0; i < count; i++) {
    res.push({
      id: nextIdStr(),
      body: sentence(),
    });
  }

  return res;
}

function makeDataComments(articles: IArticle[]) {
  const res: Record<IArticle["id"], IArticleComment[]> = {};
  for (let article of articles) {
    res[article.id] = makeComments(1);
  }

  return res;
}

let mockData: IArticle[] = [];
let mockDataIndex: TMockDataIndex = {};
let mockDataComments: Record<IArticle["id"], IArticleComment[]> = {};

if (process.env.NODE_ENV === "production") {
  mockData = makeData(GENERATION_COUNT);
  mockDataIndex = makeIndex(mockData);
  mockDataComments = makeDataComments(mockData);
} else {
  if (!global.mockData) {
    global.mockData = makeData(GENERATION_COUNT);
    global.mockDataIndex = makeIndex(global.mockData);
    global.mockDataComments = makeDataComments(global.mockData);
  }
  mockData = global.mockData;
  mockDataIndex = global.mockDataIndex;
  mockDataComments = global.mockDataComments;
}

export function addComment(articleId: IArticle["id"], comment: string) {
  mockDataComments[articleId]?.push({
    id: nextIdStr(),
    body: comment,
  });
}

export { mockData, mockDataIndex, mockDataComments };
