import { body } from "express-validator";

const createSubjectValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Subject name is required"),
        body("code")
            .trim()
            .notEmpty()
            .withMessage("Subject code is required"),
        body("course")
            .trim()
            .notEmpty()
            .withMessage("Course ID is required")
            .isMongoId(),
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId(),
        body("semester")
            .notEmpty()
            .isInt({ min: 1 })
            .withMessage("Semester must be a number >= 1"),
        body("credits")
            .notEmpty()
            .isNumeric()
            .withMessage("Credits must be a number"),
    ];
};

const updateSubjectValidator = () => {
    return [
        body("name").optional().trim().notEmpty(),
        body("code").optional().trim().notEmpty(),
        body("credits").optional().isNumeric(),
    ];
};

export { createSubjectValidator, updateSubjectValidator };
