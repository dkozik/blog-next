import { NextApiRequest, NextApiResponse } from "next";
import { mockDataComments, mockDataIndex } from "@/core/mockData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { articleId, comments } = req.query as {
    articleId: string;
    comments?: string;
  };

  if (mockDataIndex.hasOwnProperty(articleId)) {
    if (comments === "true") {
      return res.status(200).json({
        ...mockDataIndex[articleId],
        comments: mockDataComments[articleId],
      });
    }

    return res.status(200).json(mockDataIndex[articleId as string]);
  }

  return res.status(404).json({
    message: `Article with id ${articleId} not found.`,
  });
}
