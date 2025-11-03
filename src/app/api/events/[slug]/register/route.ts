// src/app/api/events/[slug]/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;

  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const proofOfPayment = formData.get("proofOfPayment") as File;

    if (!fullName || !phoneNumber || !paymentMethod || !proofOfPayment) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Handle file upload
    const buffer = Buffer.from(await proofOfPayment.arrayBuffer());
    const filename = Date.now() + "-" + proofOfPayment.name;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "proofs");
    const filePath = path.join(uploadDir, filename);

    // Ensure the upload directory exists (optional, but good practice)
    // await fs.mkdir(uploadDir, { recursive: true }); // This would require 'fs' import

    await writeFile(filePath, buffer);

    // Mock database storage (log to console for now)
    console.log("New Event Registration:", {
      eventSlug: slug,
      fullName,
      phoneNumber,
      paymentMethod,
      proofOfPaymentPath: `/uploads/proofs/${filename}`,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Registration successful!" }, { status: 200 });
  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
