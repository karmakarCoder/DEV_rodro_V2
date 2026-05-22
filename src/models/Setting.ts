import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
  key: string;
  isMaintenanceMode: boolean;
  message: string;
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true, default: "system_config" },
  isMaintenanceMode: { type: Boolean, required: true, default: false },
  message: {
    type: String,
    default:
      "Our site is currently undergoing scheduled maintenance. We will be back shortly!",
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Setting ||
  mongoose.model<ISetting>("Setting", SettingSchema);
