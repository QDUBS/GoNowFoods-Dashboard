import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;
  const formData = await req.formData();
  const dataBody = formData.get("data") as any;
  const parsedBody = JSON.parse(dataBody);

  try {
    const profile = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/profiles/${user_id}`
    );
    const update_profile = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/profiles/${profile.data.id}`,
      {
        user_id: user_id,
        first_name: profile.data.first_name,
        last_name: profile.data.last_name,
        mobile_number: parsedBody.mobile_number,
        photo: profile.data.photo,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const update_restaurant = await axios.put(
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

    return new NextResponse(JSON.stringify("Updated successfully..."));
  } catch (error) {
    console.error("Error creating restaurant...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
