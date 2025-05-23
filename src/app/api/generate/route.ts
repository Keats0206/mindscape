// app/api/generate/route.ts
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { createClient } from "@/utils/supabase/server";

// Replicate model ID types
type ReplicateModelID = `${string}/${string}` | `${string}/${string}:${string}`;

// GET method for simple text prompt generation
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("text");
  const loraWeights = searchParams.get("loraWeights");

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  // Use LORA model if loraWeights parameter is provided
  const modelToUse = loraWeights 
    ? "black-forest-labs/flux-dev-lora" as ReplicateModelID
    : "black-forest-labs/flux-schnell" as ReplicateModelID;

  const replicate = new Replicate();
  
  const input: {
    prompt: string;
    go_fast?: boolean;
    num_outputs: number;
    aspect_ratio: string;
    output_format: string;
    output_quality: number;
    megapixels: string;
    num_inference_steps: number;
    lora_weights?: string;
    image?: string;
    prompt_strength?: number;
  } = {
    prompt,
    go_fast: true,
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 100,
    megapixels: "1",
    num_inference_steps: 4,
  };

  // Add LORA weights if provided
  if (loraWeights) {
    input.lora_weights = loraWeights;
  }

  try {
    const output = await replicate.run(modelToUse, { input }) as string[];

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

// POST method for more complex generation requests including LORA weights
export async function POST(request: Request) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { prompt, loraWeights, imageBase64, modelId, genAppId } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Get the model information if genAppId is provided
    const modelToUse = "black-forest-labs/flux-dev-lora" as ReplicateModelID;
    const loraWeightsToUse = loraWeights;

    // Basic configuration
    const input: {
      prompt: string;
      num_outputs: number;
      aspect_ratio: string;
      output_format: string;
      output_quality: number;
      megapixels: string;
      num_inference_steps: number;
      lora_weights?: string;
      image?: string;
      prompt_strength?: number;
    } = {
      prompt,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 100,
      megapixels: "1",
      num_inference_steps: modelId === "fast" ? 4 : 25, // Use fewer steps for fast model
    };

    // Add LORA weights if provided
    if (loraWeightsToUse) {
      input.lora_weights = loraWeightsToUse;
    }

    // Add image for image-to-image generation if provided
    if (imageBase64) {
      input.image = imageBase64;
      input.prompt_strength = 0.8; // How much to honor the prompt vs. the initial image
    }

    // Create Replicate instance and run the model
    const replicate = new Replicate();
    const output = await replicate.run(modelToUse, { input }) as string[];

    if (!output || output.length === 0) {
      return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }

    // Get the generated image URL
    const imageUrl = output[0];

    // Save generation to database
    const { data: generationData, error: generationError } = await supabase
      .from('generations')
      .insert({
        user_id: user.id,
        type: 'image',
        prompt,
        result_url: imageUrl,
        model_used: modelToUse,
        is_public: false,
        lora_weights: loraWeightsToUse,
        gen_app_id: genAppId
      })
      .select()
      .single();

    if (generationError) {
      console.error("Error saving generation:", generationError);
      // Continue even if database save fails, just log the error
    }

    // Return the image URL to the client
    return NextResponse.json({ 
      imageUrl,
      generationId: generationData?.id
    }, { status: 200 });

  } catch (error) {
    console.error("Error in image generation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}