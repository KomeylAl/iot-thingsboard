import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(
   req: NextApiRequest,
   res: NextApiResponse
 ) {
   return res.json({ message: "hello" });
 }