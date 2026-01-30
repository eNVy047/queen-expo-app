import { body } from "express-validator";

const createVideoValidator = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("videoFile").trim().notEmpty().withMessage("Video URL is required"),
        body("thumbnail").trim().notEmpty().withMessage("Thumbnail URL is required"),
        body("duration").notEmpty().isNumeric().withMessage("Duration is required"),
    ];
};

export { createVideoValidator };
