// app/api/generate/route.ts
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("text");

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const replicate = new Replicate();
  const model = "black-forest-labs/flux-schnell";
  const input = {
    prompt,
    go_fast: true,
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 100,
    megapixels: "1",
    num_inference_steps: 4,
  };

  try {
    const output = await replicate.run(model, { input }) as string[];

    if (output && output.length > 0) {
      const imageUrl = output[0];
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();

      return new NextResponse(imageBlob, {
        status: 200,
        headers: {
          'Content-Type': imageBlob.type,
        },
      });
    } else {
      return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}