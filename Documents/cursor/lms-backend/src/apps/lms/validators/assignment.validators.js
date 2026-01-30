import { body } from "express-validator";

const createAssignmentValidator = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("content").trim().notEmpty().withMessage("Content is required"),
        body("document").optional().isArray(), // More complex validation if needed
    ];
};

const submitAssignmentValidator = () => {
    return [
        body("content").trim().notEmpty().withMessage("Submission content is required"),
        body("assignmentId").trim().notEmpty().isMongoId().withMessage("Assignment ID is required"),
    ];
};

export { createAssignmentValidator, submitAssignmentValidator };
