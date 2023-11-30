import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    const userResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        email: email,
        password: password,
        user_type: "ENTERPRISE",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const profileResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/profiles`,
      {
        user_id: userResponse.data.id,
        first_name: name,
        last_name: "",
        mobile_number: "",
        photo: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const restaurantResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurants`,
      {
        user_id: userResponse.data.id,
        name: name,
        image: "",
        delivery_fee: 0,
        min_delivery_time: 0,
        max_delivery_time: 0,
        rating: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const addressResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
      {
        user_id: userResponse.data.id,
        street1: "",
        street2: "",
        city: "",
        state: "",
        country: "",
        postal_code: 0,
        latitude: 0,
        longitude: 0,
        type: "WORK",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ data: userResponse.data }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const get_users = await axios.get(`http://127.0.0.1:8000/users/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new NextResponse(JSON.stringify(get_users.data));
  } catch (error) {
    console.error("Error fetching users...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
