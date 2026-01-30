import mongoose, { Schema } from "mongoose";
import { Institution } from "./institution.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bookmarkedBy: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
    },
  },
  { timestamps: true }
);

eventSchema.plugin(mongooseAggregatePaginate);

export const Event = mongoose.model("Event", eventSchema);
