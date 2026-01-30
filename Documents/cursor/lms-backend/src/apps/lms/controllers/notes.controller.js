import { Notes } from "../models/notes.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createNotes = asyncHandler(async (req, res) => {
    const { title, description, url, subject } = req.body;

    const notes = await Notes.create({
        title,
        description,
        url,
        subject,
        uploadedBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, notes, "Notes uploaded successfully"));
});

const getNotes = asyncHandler(async (req, res) => {
    const { subjectId } = req.query;
    const filter = subjectId ? { subject: subjectId } : {};
    const notes = await Notes.find(filter).populate("uploadedBy", "fullName");
    return res.status(200).json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

export { createNotes, getNotes };
