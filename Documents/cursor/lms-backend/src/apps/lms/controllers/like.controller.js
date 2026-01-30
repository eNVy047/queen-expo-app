import { SocialLike } from "../models/like.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const toggleLike = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.body;
    const userId = req.user._id;

    const query = { likedBy: userId };
    if (postId) query.postId = postId;
    if (commentId) query.commentId = commentId;

    const existingLike = await SocialLike.findOne(query);

    if (existingLike) {
        await SocialLike.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, {}, "Unliked successfully"));
    } else {
        await SocialLike.create({ ...query });
        return res.status(201).json(new ApiResponse(201, {}, "Liked successfully"));
    }
});

export { toggleLike };
