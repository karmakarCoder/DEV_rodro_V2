import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  status: string;
  stack: string[];
  image: string;
  live_url: string;
  repo: string;
  updated_at: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" },
    stack: { type: [String], default: [] },
    image: { type: String, required: true },
    live_url: { type: String, default: null },
    repo: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  },
);

const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
