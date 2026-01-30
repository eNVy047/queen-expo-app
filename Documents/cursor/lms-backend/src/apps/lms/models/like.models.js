import mongoose, { Schema } from "mongoose";
import { Video } from "./video.models.js";
import { Comment } from "./comment.models.js";

const likeSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: null,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const SocialLike = mongoose.model("SocialLike", likeSchema);
