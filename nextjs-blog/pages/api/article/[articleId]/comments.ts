import { NextApiRequest, NextApiResponse } from "next";
import { addComment, mockDataComments, mockDataIndex } from "@/core/mockData";
import { IPostArticleCommentRequest } from "@/api/types/request";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { articleId } = req.query as { articleId: string };

  // Break before start working for not found articles
  if (!mockDataIndex.hasOwnProperty(articleId)) {
    return res.status(404).json({
      message: `Article with id ${articleId} not found.`,
    });
  }

  if (req.method === "POST") {
    // Post new comment here
    const { body } = req.body as IPostArticleCommentRequest;
    addComment(articleId, body);
    // mockDataComments
    return res.status(200).send(mockDataComments);
  }

  return res.status(200).json(mockDataComments[articleId]);
}
