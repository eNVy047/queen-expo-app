import { Comment } from "../models/comment.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
    const { content, postId } = req.body;

    const comment = await Comment.create({
        content,
        postId,
        author: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
});

const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate("author", "fullName");
    return res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export { addComment, getComments };
