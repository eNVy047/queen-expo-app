import { Teacher } from "../models/teacher.models.js";
import { User } from "../../../common/models/user.models.js";
import { UserRolesEnum } from "../../../constants.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createTeacher = asyncHandler(async (req, res) => {
    const {
        institution,
        employeeId,
        department,
        designation,
        qualifications,
        experience,
        specializations,
        userId // Admin creates profile for this User ID
    } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required to create a teacher profile");
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }

    const existingTeacher = await Teacher.findOne({ user: userId });
    if (existingTeacher) {
        throw new ApiError(409, "User is already registered as a teacher");
    }

    const teacher = await Teacher.create({
        user: userId,
        institution,
        employeeId,
        department,
        designation,
        qualifications,
        experience,
        specializations,
        createdBy: req.user._id
    });

    // Update User Role to TEACHER
    await User.findByIdAndUpdate(userId, {
        $set: { role: UserRolesEnum.TEACHER }
    });


    return res
        .status(201)
        .json(new ApiResponse(201, teacher, "Teacher profile created successfully"));
});

const getTeacherProfile = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate("institution").populate("user");

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher profile fetched successfully"));
});

const getTeacherById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate("institution").populate("user");

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher profile fetched successfully"));
});

const updateTeacherProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { department, designation, experience, specializations, qualifications } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
        id,
        {
            $set: {
                department,
                designation,
                experience,
                specializations,
                qualifications
            },
        },
        { new: true }
    );

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher profile updated successfully"));
});

const getAllTeachers = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    const teachers = await Teacher.find(filter).populate("user", "fullName email");

    return res.status(200).json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
})

export {
    createTeacher,
    getTeacherProfile,
    getTeacherById,
    updateTeacherProfile,
    getAllTeachers
};
