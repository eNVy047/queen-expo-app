import { Institution } from "../models/institution.models.js";
import { Branch } from "../models/branch.models.js";
import { User } from "../../../common/models/user.models.js";
import { UserRolesEnum } from "../../../constants.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createInstitution = asyncHandler(async (req, res) => {
    const {
        name,
        affiliationNumber,
        email,
        domain,
        phoneNumber,
        address,
        institutionType,
        logo,
        logoDimensions
    } = req.body;

    // Additional check if needed, though validator handles most
    const existedInstitution = await Institution.findOne({
        $or: [{ email }, { affiliationNumber }, { domain }],
    });

    if (existedInstitution) {
        throw new ApiError(409, "Institution with email, affiliation number, or domain already exists");
    }

    // Assign owner as current user if authenticated
    const owner = req.user?._id;

    if (!owner) {
        throw new ApiError(401, "Unauthorized: User must be logged in to create an institution");
    }

    const institution = await Institution.create({
        name,
        affiliationNumber,
        email,
        domain,
        phoneNumber,
        address,
        institutionType,
        logo, // Assuming string URL from frontend/upload middleware
        logoDimensions,
        owner
    });

    // 1. Update User Role to ADMIN
    await User.findByIdAndUpdate(owner, {
        $set: { role: UserRolesEnum.ADMIN }
    });

    // 2. Create Default Branch (Main Campus)
    await Branch.create({
        name: "Main Campus",
        owner: institution._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, institution, "Institution created successfully"));
});

const getAllInstitutions = asyncHandler(async (req, res) => {
    // Simple fetch for now, can add pagination features later or use aggregate paginate
    // If using aggregate paginate:
    // const { page = 1, limit = 10 } = req.query;
    // const aggregate = Institution.aggregate();
    // const institutions = await Institution.aggregatePaginate(aggregate, { page, limit });

    const institutions = await Institution.find();
    return res
        .status(200)
        .json(new ApiResponse(200, institutions, "Institutions fetched successfully"));
});

const getInstitutionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const institution = await Institution.findById(id);

    if (!institution) {
        throw new ApiError(404, "Institution not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, institution, "Institution fetched successfully"));
});

const updateInstitution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, address, institutionType } = req.body;

    const institution = await Institution.findByIdAndUpdate(
        id,
        {
            $set: {
                name,
                email,
                address,
                institutionType,
            },
        },
        { new: true }
    );

    if (!institution) {
        throw new ApiError(404, "Institution not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, institution, "Institution updated successfully"));
});

const deleteInstitution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const institution = await Institution.findByIdAndDelete(id);

    if (!institution) {
        throw new ApiError(404, "Institution not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Institution deleted successfully"));
});

export {
    createInstitution,
    getAllInstitutions,
    getInstitutionById,
    updateInstitution,
    deleteInstitution,
};
