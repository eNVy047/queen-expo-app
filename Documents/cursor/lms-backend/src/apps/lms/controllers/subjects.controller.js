import { Subject } from "../models/subjects.models.js";
import { Courses } from "../models/courses.models.js";
import { Institution } from "../models/institution.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createSubject = asyncHandler(async (req, res) => {
    const { name, code, course, institution, semester, credits, description } = req.body;

    // Verify dependencies
    const institutionExists = await Institution.findById(institution);
    if (!institutionExists) throw new ApiError(404, "Institution not found");

    const courseExists = await Courses.findById(course);
    if (!courseExists) throw new ApiError(404, "Course not found");

    // Check unique code within institution/course?
    // For now simple check
    const existingSubject = await Subject.findOne({ code, institution });
    if (existingSubject) {
        throw new ApiError(409, "Subject with this code already exists in the institution");
    }

    const subject = await Subject.create({
        name,
        code,
        course,
        institution,
        semester,
        credits,
        description
    });

    return res
        .status(201)
        .json(new ApiResponse(201, subject, "Subject created successfully"));
});

const getAllSubjects = asyncHandler(async (req, res) => {
    const { courseId, institutionId, semester } = req.query;
    const filter = {};
    if (courseId) filter.course = courseId;
    if (institutionId) filter.institution = institutionId;
    if (semester) filter.semester = semester;

    const subjects = await Subject.find(filter)
        .populate("course", "name")
        .populate("institution", "name");

    return res
        .status(200)
        .json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});

const getSubjectById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findById(id)
        .populate("course", "name")
        .populate("institution", "name");

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, subject, "Subject fetched successfully"));
});

const updateSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, code, credits, description, semester } = req.body;

    const subject = await Subject.findByIdAndUpdate(
        id,
        { $set: { name, code, credits, description, semester } },
        { new: true }
    );

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, subject, "Subject updated successfully"));
});

const deleteSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Subject deleted successfully"));
});

export {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};
