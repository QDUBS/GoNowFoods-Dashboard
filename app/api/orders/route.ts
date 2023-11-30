import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const get_orders = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/orders/restaurant?restaurant_id=${"2e35d2eafc10424b9bf2bab4fce109a8"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify(get_orders.data));
  } catch (error) {
    console.error("Error fetching orders...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
