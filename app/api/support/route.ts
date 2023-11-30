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
    const support_ticket = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/support_tickets`,
      {
        user_id: user_id,
        issue: parsedBody.issue,
        subject: parsedBody.subject,
        message: parsedBody.message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify("Created successfully..."));
  } catch (error) {
    console.error("Error creating support ticket...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
