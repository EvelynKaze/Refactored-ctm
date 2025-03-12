import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, to, subject, message } = body;

    if (!to || !from || !message) {
      return NextResponse.json(
        { message: "Email recipient, sender, or message is missing" },
        { status: 400 }
      );
    }

      const data = await resend.emails.send({
        from: from,
        to: [to],
        subject: subject,
        html: `<p>${message}</p>`,
      });

    return NextResponse.json({
      id: data?.data?.id,
      message:  "Email sent successfully and stored in Appwrite",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}

