import { body } from "express-validator";

const createTeacherValidator = () => {
    return [
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId()
            .withMessage("Invalid Institution ID"),
        body("employeeId")
            .trim()
            .notEmpty()
            .withMessage("Employee ID is required"),
        body("department")
            .trim()
            .notEmpty()
            .withMessage("Department is required"),
        body("designation")
            .trim()
            .notEmpty()
            .withMessage("Designation is required"),
        body("experience")
            .optional()
            .isNumeric()
            .withMessage("Experience must be a number"),
    ];
};

const updateTeacherProfileValidator = () => {
    return [
        body("department").optional().trim().notEmpty(),
        body("designation").optional().trim().notEmpty(),
        body("experience").optional().isNumeric(),
    ];
};

export { createTeacherValidator, updateTeacherProfileValidator };
