import { Student } from "../models/student.models.js";
import { User } from "../../../common/models/user.models.js";
import { UserRolesEnum } from "../../../constants.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createStudent = asyncHandler(async (req, res) => {
    const {
        institution,
        enrollmentNumber,
        rollNumber,
        department,
        batch,
        currentSemester,
        section,
        guardianName,
        guardianPhone,
        // Optional: if admin creates student for another user, userId might be passed. 
        // For now assuming the logged in user is becoming a student OR admin creates it for a NEW user (which is complex).
        // Let's assume the flow is: Admin creates a User -> Then creates a Student profile for that User.
        // OR: User registers -> Then applies to be a student.
        // Given the "createdBy" requirement, likely Admin creates it.
        userId // ID of the User to become a student
    } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required to create a student profile");
    }

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }

    // Check if already a student
    const existingStudent = await Student.findOne({ user: userId });
    if (existingStudent) {
        throw new ApiError(409, "User is already registered as a student");
    }

    const student = await Student.create({
        user: userId,
        institution,
        enrollmentNumber,
        rollNumber,
        department,
        batch,
        currentSemester,
        section,
        guardianName,
        guardianPhone,
        createdBy: req.user._id // The logged in user (Admin/Staff)
    });

    // Update User Role to STUDENT
    await User.findByIdAndUpdate(userId, {
        $set: { role: UserRolesEnum.STUDENT }
    });


    return res
        .status(201)
        .json(new ApiResponse(201, student, "Student profile created successfully"));
});

const getStudentProfile = asyncHandler(async (req, res) => {
    // Get profile of the logged in user
    const student = await Student.findOne({ user: req.user._id }).populate("institution").populate("user");

    if (!student) {
        throw new ApiError(404, "Student profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student profile fetched successfully"));
});

const getStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id).populate("institution").populate("user");

    if (!student) {
        throw new ApiError(404, "Student profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student profile fetched successfully"));
});

const updateStudentProfile = asyncHandler(async (req, res) => {
    // If admin updates or student updates themselves. 
    // Let's assume params.id is the STUDENT ID (not user id)
    const { id } = req.params;
    const { department, currentSemester, section, guardianName, guardianPhone } = req.body;

    const student = await Student.findByIdAndUpdate(
        id,
        {
            $set: {
                department,
                currentSemester,
                section,
                guardianName,
                guardianPhone
            },
        },
        { new: true }
    );

    if (!student) {
        throw new ApiError(404, "Student profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student profile updated successfully"));
});

const getAllStudents = asyncHandler(async (req, res) => {
    // Should filter by institution usually, but for now generic list
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    // Using aggregate paginate logic if needed, or simple find
    const students = await Student.find(filter).populate("user", "fullName email");

    return res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
})

export {
    createStudent,
    getStudentProfile,
    getStudentById,
    updateStudentProfile,
    getAllStudents
};
