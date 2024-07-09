import { NextApiRequest, NextApiResponse } from "next";
import { mockDataIndex } from "@/core/mockData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (mockDataIndex.hasOwnProperty(id as string)) {
    return res.status(200).json(mockDataIndex[id as string]);
  }

  return res.status(404).json({
    message: `Article with id ${id} not found.`,
  });
}
