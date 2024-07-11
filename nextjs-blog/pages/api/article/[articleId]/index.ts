import { NextApiRequest, NextApiResponse } from "next";
import { mockDataComments, mockDataIndex } from "@/core/mockData";
import { CMS } from "@/cms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { articleId, comments } = req.query as {
    articleId: string;
    comments?: string;
  };

  const articleResponse = await CMS.instance.loadSingleArticle(
    articleId,
    comments === "true",
  );

  if (articleResponse.error?.status) {
    return res
      .status(articleResponse.error?.status)
      .json(articleResponse.error);
  }

  return res.status(200).json(articleResponse.data);

  // if (mockDataIndex.hasOwnProperty(articleId)) {
  //   if (comments === "true") {
  //     return res.status(200).json({
  //       ...mockDataIndex[articleId],
  //       comments: mockDataComments[articleId],
  //     });
  //   }
  //
  //   return res.status(200).json(mockDataIndex[articleId as string]);
  // }

  // return res.status(404).json({
  //   message: `Article with id ${articleId} not found.`,
  // });
}
