import { Event } from "../models/event.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, venue, image } = req.body;

    const event = await Event.create({
        title,
        description,
        date,
        venue,
        image,
        bookmarkedBy: req.user._id // Using bookmark as owner/creator reference? Model has bookmarkedBy ref Institution
    });

    return res.status(201).json(new ApiResponse(201, event, "Event created successfully"));
});

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    return res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
});

export { createEvent, getEvents };
