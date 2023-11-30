import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;
  const formData = await req.formData();
  const dataBody = formData.get("data") as any;
  const parsedBody = JSON.parse(dataBody);

  try {
    const restaurant = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurants`,
      {
        user_id: user_id,
        name: parsedBody.name,
        image: parsedBody.image,
        delivery_fee: parsedBody.delivery_fee,
        min_delivery_time: parsedBody.min_delivery_time,
        max_delivery_time: parsedBody.max_delivery_time,
        isActive: parsedBody.isActive,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify("Created successfully..."));
  } catch (error) {
    console.error("Error creating restaurant...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}


  // (user_id = request.user_id),
  //   (name = request.name),
  //   (image = request.image),
  //   (delivery_fee = request.delivery_fee),
  //   (min_delivery_time = request.min_delivery_time),
  //   (max_delivery_time = request.max_delivery_time),
  //   (rating = request.rating);
