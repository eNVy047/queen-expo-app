import { Video } from "../models/video.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createVideo = asyncHandler(async (req, res) => {
    const { title, description, videoFile, thumbnail, duration } = req.body;

    const video = await Video.create({
        title,
        description,
        videoFile,
        thumbnail,
        duration,
        owner: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, video, "Video uploaded successfully"));
});

const getVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({ isPublished: true }).populate("owner", "fullName");
    return res.status(200).json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

export { createVideo, getVideos };
