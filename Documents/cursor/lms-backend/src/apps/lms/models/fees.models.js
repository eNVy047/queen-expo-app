import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const feeSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["PAID", "PENDING", "OVERDUE"],
      default: "PENDING"
    },
    paidDate: {
      type: Date
    },
    transactionId: {
      type: String
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

feeSchema.plugin(mongooseAggregatePaginate);

export const Fees = mongoose.model("Fees", feeSchema);
