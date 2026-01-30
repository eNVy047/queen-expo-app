import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const studentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },
        enrollmentNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        rollNumber: {
            type: String,
            required: true,
            trim: true
        },
        department: {
            type: String, // Can be ref if Department model exists
            required: true,
            trim: true
        },
        batch: {
            type: String, // e.g., "2023-2027"
            required: true,
            trim: true
        },
        currentSemester: {
            type: Number,
            required: true,
            min: 1
        },
        section: {
            type: String,
            trim: true
        },
        guardianName: {
            type: String,
            trim: true
        },
        guardianPhone: {
            type: String,
            trim: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

studentSchema.plugin(mongooseAggregatePaginate);

export const Student = mongoose.model("Student", studentSchema);
