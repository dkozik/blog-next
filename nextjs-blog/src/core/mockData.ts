import { IArticle } from "@/core/types";
import { article, sentence } from "@ndaidong/txtgen";

const GENERATION_COUNT = 100;

type TMockDataIndex = Record<IArticle["id"], IArticle>;

function makeData(count: number = 10): Array<IArticle> {
  const data = new Array<IArticle>(count).fill(null).map(() => {
    const res: IArticle = {
      id: Math.random().toString(10).substring(2, 4),
      title: sentence(),
      body: article(1 + Math.floor(Math.random() * 2)),
      // body: article(10 + Math.floor(Math.random() * 10)),
      // body: article(10),
      imageSrc: `https://dummyimage.com/160x150/666/fff`,
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

let mockData: IArticle[] = [];
let mockDataIndex: TMockDataIndex = {};

if (process.env.NODE_ENV === "production") {
  mockData = makeData(GENERATION_COUNT);
  mockDataIndex = makeIndex(mockData);
} else {
  if (!global.mockData) {
    global.mockData = makeData(GENERATION_COUNT);
    global.mockDataIndex = makeIndex(global.mockData);
  }
  mockData = global.mockData;
  mockDataIndex = global.mockDataIndex;
}

export { mockData, mockDataIndex };
