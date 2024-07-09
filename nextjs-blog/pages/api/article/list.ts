import { NextApiRequest, NextApiResponse } from "next";
import { mockData } from "@/core/mockData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const pageFrame = mockData.slice(offset, offset + +pageSize);

  return res.status(200).json({
    page,
    pageSize,
    total: mockData.length,
    data: pageFrame,
  });
}
