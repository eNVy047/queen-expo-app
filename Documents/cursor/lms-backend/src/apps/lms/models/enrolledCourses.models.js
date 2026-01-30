import mongoose, { Schema } from "mongoose";
import { User } from "../../../common/models/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const enrolledCourseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
  },
  { timestamps: true }
);

enrolledCourseSchema.plugin(mongooseAggregatePaginate);

export const EnrolledCourse = mongoose.model("EnrolledCourse", enrolledCourseSchema);
