import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postId: {
      url: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "authorModel",
    },
    authorModel: {
      type: String,
      required: true,
      enum: ["User", "Institution"], // Updated models
    },
  },
  { timestamps: true }
);

announcementSchema.plugin(mongooseAggregatePaginate);

export const Announcement = mongoose.model("Announcement", announcementSchema);
