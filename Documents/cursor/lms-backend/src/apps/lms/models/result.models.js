import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const resultSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    quizz: {
      type: Schema.Types.ObjectId,
      ref: "Quizz"
    },
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment"
    },
    score: {
      type: Number,
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number
    },
    status: {
      type: String,
      enum: ["PASS", "FAIL", "PENDING"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

resultSchema.plugin(mongooseAggregatePaginate);

export const Result = mongoose.model("Result", resultSchema);
