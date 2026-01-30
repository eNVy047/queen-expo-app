import { Fees } from "../models/fees.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createFeeRecord = asyncHandler(async (req, res) => {
    const { student, amount, dueDate, description } = req.body;

    const fee = await Fees.create({
        student,
        amount,
        dueDate,
        description
    });

    return res.status(201).json(new ApiResponse(201, fee, "Fee record created successfully"));
});

const getFees = asyncHandler(async (req, res) => {
    const { studentId, status } = req.query;
    const filter = {};
    if (studentId) filter.student = studentId;
    if (status) filter.status = status;

    const fees = await Fees.find(filter).populate("student");
    return res.status(200).json(new ApiResponse(200, fees, "Fees fetched successfully"));
});

export { createFeeRecord, getFees };
