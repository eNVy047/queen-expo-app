import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const coursesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
    },
  },
  { timestamps: true }
);

coursesSchema.plugin(mongooseAggregatePaginate);

export const Courses = mongoose.model("Courses", coursesSchema);
