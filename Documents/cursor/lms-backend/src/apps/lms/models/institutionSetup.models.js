import mongoose, { Schema } from "mongoose";

const bankDetailsSchema = new Schema({
    accountName: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: String,
        required: true,
        trim: true
    },
    ifsc: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    bankName: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    },
});

const universitySetupSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            unique: true
        },
        registrationCertificate: {
            type: String, // cloudinary url
            required: true,
        },
        affiliationCertificate: {
            type: String, // cloudinary url
            required: true,
        },
        trustRegistration: {
            type: String, // cloudinary url
            required: true,
        },
        panNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        gstNumber: {
            type: String,
            trim: true,
            uppercase: true,
            default: null
        },
        bankDetails: {
            type: bankDetailsSchema,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const InstitutionSetup = mongoose.model("InstitutionSetup", universitySetupSchema);
