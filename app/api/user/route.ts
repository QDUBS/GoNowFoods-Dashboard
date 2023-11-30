import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const get_user = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(get_user.data);

    return new NextResponse(JSON.stringify(get_user.data));
  } catch (error) {
    console.error("Error fetching users...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
