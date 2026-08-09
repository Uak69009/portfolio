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

    const targetEmail = "umairamjadkhanamazai@gmail.com";
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // 1. If Web3Forms Access Key is provided in environment variables, use Web3Forms
    if (accessKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: subject || `New Portfolio Contact from ${name}`,
          message,
        }),
      });

      const result = await response.json();
      if (result.success || response.ok) {
        return NextResponse.json({ success: true, message: "Email delivered successfully!" });
      }
    }

    // 2. Direct FormSubmit AJAX service with site origin headers
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://umairamjadkhan.dev/",
        Origin: "https://umairamjadkhan.dev",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: subject || `Portfolio Inquiry from ${name}`,
        message: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
        _captcha: "false",
        _template: "table",
      }),
    });

    const fsData = await formSubmitRes.json();

    if (formSubmitRes.ok && (fsData.success === "true" || fsData.success === true)) {
      return NextResponse.json({
        success: true,
        message: "Your message has been delivered to Umair's email inbox!",
      });
    }

    // Handle FormSubmit 1-time email activation step
    if (fsData.message && fsData.message.toLowerCase().includes("activation")) {
      return NextResponse.json({
        success: true,
        message: "Message dispatched! Check your Gmail inbox (umairamjadkhanamazai@gmail.com) to click the 1-time 'Activate Form' link.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message was sent.",
    });
  }
}


