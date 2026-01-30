import { body } from "express-validator";

const toggleLikeValidator = () => {
    return [
        body().custom((value, { req }) => {
            const { videoId, commentId } = req.body;
            if ((!videoId && !commentId) || (videoId && commentId)) {
                throw new Error("Exactly one of videoId or commentId must be provided");
            }
            return true;
        }),
        body("videoId").optional().isMongoId().withMessage("Invalid Video ID"),
        body("commentId").optional().isMongoId().withMessage("Invalid Comment ID"),
    ];
};

export { toggleLikeValidator };
