import mongoose, { Schema } from "mongoose";
import { LmsEnum } from "../../../constants.js";

const institutionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        affiliationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        domain: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        phoneNumber: {
            type: String, // Changed to String for flexibility
            trim: true,
            unique: true,
            index: true
        },
        logo: {
            type: String, // cloudinary url
            required: true,
        },
        logoDimensions: {
            height: { type: Number, required: true },
            width: { type: Number, required: true }
        },
        coverImage: {
            type: String, // cloudinary url
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        institutionType: {
            type: String,
            enum: Object.values(LmsEnum),
            default: LmsEnum.College,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
)

export const Institution = mongoose.model("Institution", institutionSchema)