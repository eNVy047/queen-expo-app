import { Result } from "../models/result.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createResult = asyncHandler(async (req, res) => {
    const { student, quizz, assignment, score, totalScore } = req.body;

    const percentage = (score / totalScore) * 100;
    const status = percentage >= 40 ? "PASS" : "FAIL";

    const result = await Result.create({
        student,
        quizz,
        assignment,
        score,
        totalScore,
        percentage,
        status
    });

    return res.status(201).json(new ApiResponse(201, result, "Result created successfully"));
});

const getResults = asyncHandler(async (req, res) => {
    const { studentId } = req.query;
    const filter = studentId ? { student: studentId } : {};
    const results = await Result.find(filter).populate("student").populate("quizz").populate("assignment");
    return res.status(200).json(new ApiResponse(200, results, "Results fetched successfully"));
});

export { createResult, getResults };
