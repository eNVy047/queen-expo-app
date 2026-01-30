import { Announcement } from "../models/announcement.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createAnnouncement = asyncHandler(async (req, res) => {
    const { title, content, authorModel } = req.body;

    const announcement = await Announcement.create({
        title,
        content,
        author: req.user._id, // Or Institution ID if admin
        authorModel: authorModel || "User"
    });

    return res.status(201).json(new ApiResponse(201, announcement, "Announcement created successfully"));
});

const getAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find();
    return res.status(200).json(new ApiResponse(200, announcements, "Announcements fetched successfully"));
});

export { createAnnouncement, getAnnouncements };
