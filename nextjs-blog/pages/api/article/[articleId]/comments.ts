import { NextApiRequest, NextApiResponse } from "next";
import { CMS } from "@/cms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { articleId } = req.query as { articleId: string };

  if (req.method === "POST") {
    if (!Boolean(req.body.body)) {
      return res.status(400).send({
        message: "Message body cannot be empty",
      });
    }

    await CMS.instance.postComment(articleId, req.body);
    return res.status(200).send({ status: 200 });
  }

  const { data: comments, error } =
    await CMS.instance.loadArticleComments(articleId);

  if (error?.status) {
    return res.status(error?.status).json(error);
  }

  return res.status(200).json(comments);
}
