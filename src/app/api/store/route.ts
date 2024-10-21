// app/api/store/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { userId, prompt, imageData, modelUsed, isPublic, tags } = await request.json();

  if (!userId || !prompt || !imageData || !modelUsed) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Upload image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generations')
      .upload(`${userId}/${Date.now()}.webp`, Buffer.from(imageData.split(',')[1], 'base64'), {
        contentType: 'image/webp'
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('generations')
      .getPublicUrl(uploadData.path);

    // Store generation data in the database
    const { data, error } = await supabase
      .from('generations')
      .insert({
        user_id: userId,
        type: 'image',
        prompt: prompt,
        result_url: publicUrl,
        model_used: modelUsed,
        is_public: isPublic,
        tags: tags
      })
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error storing generation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}