import { Quizz } from "../models/quizz.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createQuizz = asyncHandler(async (req, res) => {
    const { title, description, subject, questions, totalMarks, duration } = req.body;

    const quizz = await Quizz.create({
        title,
        description,
        subject,
        questions,
        totalMarks,
        duration,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, quizz, "Quizz created successfully"));
});

const getQuizzes = asyncHandler(async (req, res) => {
    const { subjectId } = req.query;
    const filter = subjectId ? { subject: subjectId } : {};
    const quizzes = await Quizz.find(filter);
    return res.status(200).json(new ApiResponse(200, quizzes, "Quizzes fetched successfully"));
});

export { createQuizz, getQuizzes };
