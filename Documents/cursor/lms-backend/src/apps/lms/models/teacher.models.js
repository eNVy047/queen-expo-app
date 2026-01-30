import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const teacherSchema = new Schema(
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
        employeeId: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        department: {
            type: String,
            required: true,
            trim: true
        },
        designation: {
            type: String,
            required: true,
            trim: true
        },
        qualifications: [{
            degree: String,
            institution: String,
            year: Number
        }],
        experience: {
            type: Number, // In years
            default: 0
        },
        specializations: [{
            type: String,
            trim: true
        }],
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

teacherSchema.plugin(mongooseAggregatePaginate);

export const Teacher = mongoose.model("Teacher", teacherSchema);
