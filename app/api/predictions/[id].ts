import { NextApiRequest, NextApiResponse } from "next";
import Replicate, { Prediction } from "replicate";
import { defaultPrediction } from "./(utils)";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let prediction = defaultPrediction;

  const input = req.query.next;
  if (input && !Array.isArray(input))
    prediction = await replicate.predictions.get(input);

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.end(JSON.stringify(prediction));
}
