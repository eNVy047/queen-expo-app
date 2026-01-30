import { body } from "express-validator";

const createNotesValidator = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("url").trim().notEmpty().withMessage("File URL is required"),
        body("subject").trim().notEmpty().isMongoId().withMessage("Subject ID is required"),
    ];
};

export { createNotesValidator };
