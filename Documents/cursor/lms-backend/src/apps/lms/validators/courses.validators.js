import { body } from "express-validator";

const createCourseValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Course name is required"),
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId()
            .withMessage("Invalid Institution ID"),
    ];
};

const updateCourseValidator = () => {
    return [
        body("name").optional().trim().notEmpty().withMessage("Course name cannot be empty"),
    ];
};

export { createCourseValidator, updateCourseValidator };
