import mongoose, { Schema } from "mongoose";
import { Institution } from "./institution.models.js";

const branchSchema = new Schema(
  {
    name: {
      type: String, 
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
    },
  },
  { timestamps: true }
);

export const Branch = mongoose.model("Branch", branchSchema);
