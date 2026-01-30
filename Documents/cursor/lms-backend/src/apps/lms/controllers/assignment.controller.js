import { Assignment } from "../models/assignment.models.js";
import { SubAssignment } from "../models/submittedAssignment.models.js";
import { Student } from "../models/student.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createAssignment = asyncHandler(async (req, res) => {
    const { title, content, document } = req.body;

    const assignment = await Assignment.create({
        title,
        content,
        document, // Array of {url, localPath}
        author: req.user._id // Teacher/Admin
    });

    return res
        .status(201)
        .json(new ApiResponse(201, assignment, "Assignment created successfully"));
});

const submitAssignment = asyncHandler(async (req, res) => {
    const { assignmentId, title, content, document } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) throw new ApiError(404, "Assignment not found");

    // Check if user is a student?
    // Assuming req.user is populated. Link to Student profile if needed, or just use User ID.
    // SubAssignment uses 'submittedBy' (Array of Student?). 

    // Ideally find the Student profile of the logged in user
    const studentProfile = await Student.findOne({ user: req.user._id });
    if (!studentProfile) throw new ApiError(403, "Only students can submit assignments");

    const submission = await SubAssignment.create({
        title: title || `Submission for ${assignment.title}`,
        content,
        document,
        author: req.user._id,
        submittedBy: [studentProfile._id]
    });

    // Link submission to assignment? 
    // Assignment model has 'submitted' array
    assignment.submitted.push(submission._id);
    await assignment.save();

    return res.status(201).json(new ApiResponse(201, submission, "Assignment submitted successfully"));
});

const getAllAssignments = asyncHandler(async (req, res) => {
    const assignments = await Assignment.find().populate("author", "fullName");
    return res
        .status(200)
        .json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
});

const getAssignmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const assignment = await Assignment.findById(id).populate("submitted"); // Populate submissions if needed

    if (!assignment) {
        throw new ApiError(404, "Assignment not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, assignment, "Assignment fetched successfully"));
});

export {
    createAssignment,
    submitAssignment,
    getAllAssignments,
    getAssignmentById
};
