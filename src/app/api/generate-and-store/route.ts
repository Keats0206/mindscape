import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { supabase } from "@/utils/supabase/client";

export async function POST(request: NextRequest) {
  const replicate = new Replicate();
  const { userId, prompt, tags } = await request.json();

  if (!userId || !prompt || !tags) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const model = "black-forest-labs/flux-schnell";
  const input = {
    prompt,
    go_fast: true,
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 80,
    megapixels: "0.25",
    num_inference_steps: 2,
  };

  try {
    const output = await replicate.run(model, { input }) as string[];
    const imageUrl = output[0];

    // Store generation info in Supabase
    const generationData = {
      user_id: userId,
      type: "image",
      prompt: prompt,
      result_url: imageUrl,
      model_used: model,
      is_public: true,
      tags: tags
    };

    const { data, error } = await supabase
      .from("generations")
      .insert(generationData)
      .select();

    if (error) {
      console.error('Error saving to database:', error);
      return NextResponse.json({ error: 'Failed to save generation data' }, { status: 500 });
    }

    return NextResponse.json(data[0]);

  } catch (error) {
    console.error('Error generating or saving image:', error);
    return NextResponse.json({ error: 'Failed to generate or save image' }, { status: 500 });
  }
}