import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const get_order = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify(get_order.data));
  } catch (error) {
    console.error("Error fetching order...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;
  const formData = await req.formData();

  const dataBody = formData.get("data") as any;
  const parsedBody = JSON.parse(dataBody);
  const id = parsedBody.id;

  try {
    const update_order = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
      {
        user_id: parsedBody.user_id,
        courier_id: parsedBody.courier_id == null ? "" : parsedBody.courier_id,
        restaurant_id: parsedBody.restaurant_id,
        total: parsedBody.total,
        status: parsedBody.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify("Updated..."));
  } catch (error) {
    console.error("Error updating order...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
