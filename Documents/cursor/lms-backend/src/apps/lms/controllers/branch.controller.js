import { Branch } from "../models/branch.models.js";
import { Institution } from "../models/institution.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createBranch = asyncHandler(async (req, res) => {
    const { name, owner } = req.body;

    const institutionExists = await Institution.findById(owner);
    if (!institutionExists) throw new ApiError(404, "Owner (Institution) not found");

    const branch = await Branch.create({
        name,
        owner,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, branch, "Branch created successfully"));
});

const getAllBranches = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { owner: institutionId } : {};

    const branches = await Branch.find(filter).populate("owner", "name");

    return res
        .status(200)
        .json(new ApiResponse(200, branches, "Branches fetched successfully"));
});

const getBranchById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const branch = await Branch.findById(id).populate("owner", "name");

    if (!branch) {
        throw new ApiError(404, "Branch not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, branch, "Branch fetched successfully"));
});

const updateBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const branch = await Branch.findByIdAndUpdate(
        id,
        { $set: { name } },
        { new: true }
    );

    if (!branch) {
        throw new ApiError(404, "Branch not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, branch, "Branch updated successfully"));
});

const deleteBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const branch = await Branch.findByIdAndDelete(id);

    if (!branch) {
        throw new ApiError(404, "Branch not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Branch deleted successfully"));
});

export {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
};
