import { NextApiRequest, NextApiResponse } from "next";
import { mockData } from "@/core/mockData";
import { CMS } from "@/cms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { page = 1, pageSize = 10 } = req.query;

  if (+pageSize > 20) {
    return res.status(400).json({
      message: "Page size too large",
    });
  }

  const offset = (+page - 1) * +pageSize;
  if (isNaN(offset)) {
    return res.status(400).json({ message: `Invalid page number.` });
  }

  const articlesResponse = await CMS.instance.loadArticles(+page, +pageSize);

  if (articlesResponse.error?.status) {
    return res
      .status(articlesResponse.error?.status)
      .json(articlesResponse.error);
  }

  return res.status(200).json(articlesResponse.data);
}
