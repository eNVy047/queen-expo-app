import { body } from "express-validator";

const createQuizzValidator = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("subject").trim().notEmpty().isMongoId().withMessage("Subject ID is required"),
        body("questions").isArray({ min: 1 }).withMessage("At least one question is required"),
        body("questions.*.questionText").notEmpty().withMessage("Question text is required"),
        body("questions.*.options").isArray({ min: 2 }).withMessage("At least 2 options required"),
        body("questions.*.correctOptionIndex").isInt().withMessage("Correct option index required"),
    ];
};

export { createQuizzValidator };
