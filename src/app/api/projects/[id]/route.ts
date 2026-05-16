import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

// PUT: Update Project
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const { id } = await params;

    // 1. Read payload as FormData instead of JSON
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const live_url = formData.get("live_url") as string;
    const repo = formData.get("repo") as string;

    // Parse the tech stack comma string back into an array
    const rawStack = formData.get("stack") as string;
    const stack = rawStack
      ? rawStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;

    // Extract the image field (could be a fresh File binary or an existing string URL)
    const fileOrString = formData.get("image");

    // Build our dynamic update payload object
    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();
    if (status) updateData.status = status;
    if (stack) updateData.stack = stack;
    updateData.live_url = live_url?.trim() || "";
    updateData.repo = repo?.trim() || "";

    // 2. Process Image File if a fresh binary was sent
    if (
      fileOrString &&
      typeof fileOrString !== "string" &&
      (fileOrString as File).size > 0
    ) {
      const file = fileOrString as File;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(filePath, buffer);

      // Save the fresh uploaded relative path link
      updateData.image = `/uploads/${uniqueFilename}`;
    } else if (typeof fileOrString === "string" && fileOrString.trim() !== "") {
      // Keep their existing image link if they didn't upload a new file
      updateData.image = fileOrString;
    }

    // 3. Update records safely inside MongoDB
    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error: any) {
    console.error("[PUT /api/projects]", error);
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE: Delete Project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 500 },
    );
  }
}
