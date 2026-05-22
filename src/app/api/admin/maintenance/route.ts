import { NextResponse } from "next/server";
import Setting from "@/models/Setting";
import connectDB from "@/lib/db";

// GET: Check the current configuration
export async function GET() {
  try {
    await connectDB();
    let config = await Setting.findOne({ key: "system_config" });

    if (!config) {
      config = await Setting.create({ key: "system_config" });
    }

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch configurations" },
      { status: 500 },
    );
  }
}

// PUT: Change maintenance status
export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json(); // Use JSON here since it's an admin setting toggle

    const { isMaintenanceMode, message } = body;

    const config = await Setting.findOneAndUpdate(
      { key: "system_config" },
      {
        isMaintenanceMode,
        message,
        updatedAt: new Date(),
      },
      { new: true, upsert: true },
    );

    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update configuration" },
      { status: 500 },
    );
  }
}
