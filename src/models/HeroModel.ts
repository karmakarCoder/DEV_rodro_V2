import mongoose, { Schema } from "mongoose";

const HeroSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Hero = mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
