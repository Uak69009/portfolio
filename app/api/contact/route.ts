import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // Send payload to Web3Forms API to deliver directly to umairamjadkhan@gmail.com
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey || "59e51c8a-7cf9-42b7-873b-63a1c8413f41", // Replace with your Web3Forms or Formspree Key
        name,
        email,
        subject: subject || `New Portfolio Inquiry from ${name}`,
        message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
        from_name: `${name} (Portfolio Contact)`,
        to_email: "umairamjadkhan@gmail.com",
      }),
    });

    const result = await response.json();

    if (result.success || response.ok) {
      return NextResponse.json({
        success: true,
        message: "Your message has been delivered to Umair's inbox!",
      });
    }

    return NextResponse.json(
      { error: result.message || "Failed to deliver message." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
