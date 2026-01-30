import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of strings
  correctOptionIndex: { type: Number, required: true }, // 0-indexed
  marks: { type: Number, default: 1 }
});

const quizzSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    questions: [questionSchema],
    totalMarks: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number, // In minutes
      default: 30
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

quizzSchema.plugin(mongooseAggregatePaginate);

export const Quizz = mongoose.model("Quizz", quizzSchema);
