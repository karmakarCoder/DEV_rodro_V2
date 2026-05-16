import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 200 },
      );
    }

    const hashedPassword =
      process.env.ADMIN_PASS && (await bcrypt.hash(process.env.ADMIN_PASS, 12));

    const admin = new User({
      email: process.env.ADMIN_USER,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    return NextResponse.json(
      {
        message: "Admin created successfully",
        email: "admin@portfolio.os",
        password: "admin123",
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
