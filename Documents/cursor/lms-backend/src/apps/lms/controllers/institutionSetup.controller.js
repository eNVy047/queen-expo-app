import { InstitutionSetup } from "../models/institutionSetup.models.js";
import { Institution } from "../models/institution.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createInstitutionSetup = asyncHandler(async (req, res) => {
    const {
        institution,
        registrationCertificate,
        affiliationCertificate,
        trustRegistration,
        panNumber,
        gstNumber,
        bankDetails
    } = req.body;

    // Verify institution exists
    const institutionExists = await Institution.findById(institution);
    if (!institutionExists) {
        throw new ApiError(404, "Institution not found");
    }

    // Check if setup already exists
    const existingSetup = await InstitutionSetup.findOne({ institution });
    if (existingSetup) {
        throw new ApiError(409, "Setup details already exist for this institution");
    }

    const setup = await InstitutionSetup.create({
        institution,
        registrationCertificate,
        affiliationCertificate,
        trustRegistration,
        panNumber,
        gstNumber,
        bankDetails
    });

    return res
        .status(201)
        .json(new ApiResponse(201, setup, "Institution setup details saved successfully"));
});

const getInstitutionSetup = asyncHandler(async (req, res) => {
    const { institutionId } = req.params;
    const setup = await InstitutionSetup.findOne({ institution: institutionId }).populate("institution");

    if (!setup) {
        throw new ApiError(404, "Setup details not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, setup, "Setup details fetched successfully"));
});

const updateInstitutionSetup = asyncHandler(async (req, res) => {
    // ID here is the SETUP document ID, or we could look up by institution ID
    const { id } = req.params;
    const { bankDetails, panNumber, gstNumber } = req.body;

    const setup = await InstitutionSetup.findByIdAndUpdate(
        id,
        {
            $set: {
                bankDetails, // Note: this might replace the whole object if not careful with deep merge. Mongoose $set replaces top level fields.
                panNumber,
                gstNumber
            },
        },
        { new: true }
    );

    if (!setup) {
        throw new ApiError(404, "Setup details not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, setup, "Setup details updated successfully"));
});

export {
    createInstitutionSetup,
    getInstitutionSetup,
    updateInstitutionSetup
};
