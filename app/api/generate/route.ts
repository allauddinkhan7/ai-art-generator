import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY!);

    // Generate image
    const image = await client.textToImage({
      provider: "wavespeed",
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
      parameters: { num_inference_steps: 1 },
    });
    console.log("image.................................................",image);
    
   let dataUrl: string;

   if (typeof image === "string") {
     // If Hugging Face returned base64 string
     dataUrl = image.startsWith("data:")
       ? image
       : `data:image/jpeg;base64,${image}`;
   } else if (image && typeof (image as any).arrayBuffer === "function") {
     const arrayBuffer = await(image as any).arrayBuffer();
     const base64 = Buffer.from(arrayBuffer).toString("base64");
     dataUrl = `data:image/jpeg;base64,${base64}`;
   } else {
     throw new Error("Unexpected image type from Hugging Face SDK");
   }
   console.log("dataUrl ready for frontend:", dataUrl);
    return NextResponse.json({ image: dataUrl });
  } catch (err) {
    console.error("Image not generated:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
