import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    description: {
      type: String,
      trim: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    semester: {
      type: Number,
      required: true,
      min: 1
    },
    credits: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

subjectSchema.plugin(mongooseAggregatePaginate);

export const Subject = mongoose.model("Subject", subjectSchema);
