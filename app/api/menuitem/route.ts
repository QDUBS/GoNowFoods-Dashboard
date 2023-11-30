import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { uploadToGCS } from "../../../lib/upload";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const get_dish = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dishes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify(get_dish.data));
  } catch (error) {
    console.error("Error fetching menu...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const dataBody = formData.get("data") as any;
  const parsedBody = JSON.parse(dataBody);
  const id = parsedBody.id;

  const file: File | null = formData.get("image") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  let fileName = "";

  if (buffer && file) {
    try {
      const result = await uploadToGCS(file);
      fileName = result;
    } catch (error) {
      console.error("Error uploading file to Supabase:", error);
      return NextResponse.json(
        { error: "Error uploading file to Supabase" },
        { status: 500 }
      );
    }
  }

  try {
    const update_dish = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/dishes/${id}`,
      {
        restaurant_id: parsedBody.restaurant_id,
        name: parsedBody.name,
        image: parsedBody.image,
        description: parsedBody.description,
        price: parsedBody.price,
        category: parsedBody.category,
        category_code: parsedBody.category_code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify("Updated..."));
  } catch (error) {
    console.error("Error updating dish...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
