// app/api/store/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  console.log("Received POST request to /api/store");
  const supabase = await createClient();

  // 1. Get the user session ON THE SERVER
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Authentication error:", authError);
    return NextResponse.json({ error: "Unauthorized: User not authenticated" }, { status: 401 });
  }

  // Log the authenticated user ID
  console.log("Authenticated User ID:", user.id);

  // 2. Get other data from the request body (NO LONGER GETTING userId from here)
  const { prompt, imageData, modelUsed, isPublic } = await request.json();

  // Use the authenticated user ID from the session
  const authenticatedUserId = user.id;

  if (!prompt || !imageData || !modelUsed) {
    console.error("Missing required fields in request body:", { prompt: !!prompt, imageData: !!imageData, modelUsed: !!modelUsed });
    return NextResponse.json({ error: "Missing required fields: prompt, imageData, modelUsed" }, { status: 400 });
  }

  console.log("Request body parsed successfully:", { prompt, modelUsed, isPublic });

  try {
    // 3. Use the AUTHENTICATED user ID for the storage path
    const imagePath = `${authenticatedUserId}/${Date.now()}.webp`;
    console.log("Attempting to upload image to:", imagePath);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generations')
      .upload(imagePath, Buffer.from(imageData.split(',')[1], 'base64'), {
        contentType: 'image/webp'
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw uploadError; // Rethrow to be caught by the outer catch block
    }

    console.log("Image uploaded successfully:", uploadData);

    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('generations')
      .getPublicUrl(uploadData.path);

    console.log("Public URL obtained:", publicUrl);

    const tags = prompt.split(' ')
      .filter((word: string) => word.length > 2)
      .map((word: string) => word.toLowerCase());

    // 4. Prepare data for insertion - using AUTHENTICATED user ID
    const generationData = {
      user_id: authenticatedUserId, // Use the ID from the session
      type: 'image',
      prompt: prompt,
      result_url: publicUrl,
      model_used: modelUsed,
      is_public: isPublic ?? false, // Default is_public to false if not provided
      tags: tags
    };

    console.log("Attempting to insert generation data:", generationData);

    // Store generation data in the database
    const { data: insertedData, error: insertError } = await supabase
      .from('generations')
      .insert(generationData)
      .select(); // Select the inserted row to confirm

    // 5. Check specifically for insert errors (including RLS)
    if (insertError) {
      console.error("Database insert error:", insertError);
      // Check if it's an RLS error specifically
      if (insertError.message.includes('violates row-level security policy')) {
        console.error("RLS policy violation detected. Check the policy for INSERT on 'generations' table for the 'authenticated' role.");
        console.error(`RLS Check: Does auth.uid() [${authenticatedUserId}] equal user_id [${generationData.user_id}]?`);
      }
      throw insertError; // Rethrow to be caught by the outer catch block
    }

    console.log("Generation data inserted successfully:", insertedData);

    return NextResponse.json({ success: true, data: insertedData });
  } catch (error: unknown) {
    console.error("Error in /api/store handler:", error);
    // Ensure a generic error is returned to the client
    const statusCode = error && typeof error === 'object' && 'statusCode' in error ? (error.statusCode as number) : 500;
    const message = error && typeof error === 'object' && 'message' in error ? (error.message as string) : "Internal server error";
    // Avoid leaking detailed Supabase errors unless necessary for specific client handling
    return NextResponse.json({ error: `Failed to store generation: ${message}` }, { status: statusCode });
  }
}