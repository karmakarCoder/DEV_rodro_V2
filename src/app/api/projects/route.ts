import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import path from "path";
import fs from "node:fs/promises";

// Fetch All Projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ updated_at: -1 });

    if (projects.length === 0) {
      return NextResponse.json(
        {
          success: true,
          count: 0,
          message: "No projects found",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: projects.length,
        message: "Projects fetched successfully",
        data: projects,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[GET /api/projects]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching projects",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Create New Project
export async function POST(request: Request) {
  try {
    await connectDB();

    // 1. Read payload as FormData instead of JSON
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const live_url = formData.get("live_url") as string;
    const repo = formData.get("repo") as string;

    // Parse the stack back into an array from form field text
    const rawStack = formData.get("stack") as string;
    const stack = rawStack
      ? rawStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // 2. Extract the file object from form data
    const file = formData.get("image") as File | null;

    // Validate textual required fields
    if (!name?.trim() || !description?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "Name and description are required fields",
        },
        { status: 400 },
      );
    }

    let imageUrl = "";

    // 3. Handle File Upload System Logic
    if (file && typeof file !== "string" && file.size > 0) {
      // Validate file extension type safety
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            error:
              "Invalid image format. Only JPEG, PNG, WEBP, and GIF are allowed",
          },
          { status: 400 },
        );
      }

      // Read file contents into buffer streams
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Setup clean file naming system to prevent overwrites
      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

      // Determine storage location in your static public asset directory
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Ensure the physical directory folder actually exists on your machine
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(filePath, buffer);

      // Generate the clean relative web reference URL path string for Next.js <Image />
      imageUrl = `/uploads/${uniqueFilename}`;
    } else {
      // Fallback if no file was uploaded
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "A valid image file is required",
        },
        { status: 400 },
      );
    }

    // 4. Save metadata records directly into MongoDB
    const newProject = await Project.create({
      name: name.trim(),
      description: description.trim(),
      status: status || "pending",
      stack,
      image: imageUrl, // Saves as "/uploads/171584...-myimage.png"
      live_url: live_url?.trim() || null,
      repo: repo?.trim() || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully with image upload!",
        data: newProject,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("[POST /api/projects]", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: messages.join(", "),
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating the project",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
