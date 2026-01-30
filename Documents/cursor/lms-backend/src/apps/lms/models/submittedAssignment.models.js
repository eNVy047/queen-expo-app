import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const SubAssignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    document: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    submittedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

SubAssignmentSchema.plugin(mongooseAggregatePaginate);

export const SubAssignment = mongoose.model("SubAssignment", SubAssignmentSchema);
