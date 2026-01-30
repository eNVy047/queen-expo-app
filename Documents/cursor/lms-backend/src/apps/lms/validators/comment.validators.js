import { body } from "express-validator";

const createCommentValidator = () => {
    return [
        body("content").trim().notEmpty().withMessage("Content is required"),
        body("postId").trim().notEmpty().isMongoId().withMessage("Post ID is required"),
    ];
};

export { createCommentValidator };
