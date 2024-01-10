import { NextApiRequest, NextApiResponse } from "next";
import Replicate, { Prediction } from "replicate";
import { defaultPrediction } from "./(utils)";

export const maxDuration = 300;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface FileArgs {
  file?: string;
  filename?: string;
  fileFormat?: string;
}

const getStemsFrom = async (args: FileArgs): Promise<any> => {
  const output = await replicate.run(
    "cjwbw/demucs:25a173108cff36ef9f80f854c162d01df9e6528be175794b81158fa03836d953",
    {
      input: {
        audio: args.file,
        shifts: 1,
        float32: false,
        overlap: 0.25,
        clip_mode: "rescale",
        model_name: "htdemucs",
        mp3_bitrate: 320,
        output_format: args.fileFormat,
      },
    },
  );
  return output;
};

const getSubtitleOutput = async (args: FileArgs): Promise<any> => {
  const output = await replicate.run(
    "fictions-ai/autocaption:18a45ff0d95feb4449d192bbdc06b4a6df168fa33def76dfc51b78ae224b599b",
    {
      input: {
        font: "Poppins/Poppins-ExtraBold.ttf",
        color: "white",
        kerning: -5,
        opacity: 0,
        MaxChars: 20,
        fontsize: 7,
        translate: false,
        output_video: true,
        stroke_color: "black",
        stroke_width: 2.6,
        right_to_left: false,
        subs_position: "bottom75",
        highlight_color: "yellow",
        video_file_input: args.file,
        output_transcript: true,
      },
    },
  );
  return output;
};

const getDrumLoopOutput = async (): Promise<any> =>
  await replicate.run(
    "allenhung1025/looptest:0de4a5f14b9120ce02c590eb9cf6c94841569fafbc4be7ab37436ce738bcf49f",
    { input: { seed: -1 } },
  );

const getAestheticOutput = async (prompt: string): Promise<any> =>
  await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    { input: { prompt } },
  );

const getDefaultOutput = async (prompt: string): Promise<any> =>
  await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    { input: { prompt } },
  );

const startDeployment = async (req: NextApiRequest): Promise<any | null> => {
  const {
    body: { file, filename, toolname, prompt, fileFormat },
  } = req;

  switch (toolname) {
    case "":
      return getDefaultOutput(prompt);
    case "drum-gen":
      return getDrumLoopOutput();
    case "stem-gen":
      return getStemsFrom({ file, filename, fileFormat });
    case "subtitle-gen":
      return getSubtitleOutput({ file, filename, fileFormat });
    case "cover-art-gen":
      return getAestheticOutput(prompt);
    case "debug":
      return { req };
    default: {
      const prediction = defaultPrediction;
      prediction.error = 'Tool name not provided'
      return prediction;
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
    );
  }

  const prediction = await startDeployment(req);

  if (prediction?.error) {
    res.statusCode = 500;
    const err = JSON.stringify({ detail: prediction?.error });
    res.end(err);
    return;
  }

  if (!req.body.continuous) {
    res.end(JSON.stringify(prediction));
    return;
  }

  // const result = await replicate.wait(prediction);

  // res.statusCode = 201;
  // res.end(JSON.stringify(result));
}
