import { body } from "express-validator";

const createStudentValidator = () => {
    return [
        body("enrollmentNumber")
            .trim()
            .notEmpty()
            .withMessage("Enrollment number is required"),
        body("rollNumber")
            .trim()
            .notEmpty()
            .withMessage("Roll number is required"),
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId()
            .withMessage("Invalid Institution ID"),
        body("department")
            .trim()
            .notEmpty()
            .withMessage("Department is required"),
        body("batch")
            .trim()
            .notEmpty()
            .withMessage("Batch is required"),
        body("currentSemester")
            .notEmpty()
            .withMessage("Current semester is required")
            .isInt({ min: 1 })
            .withMessage("Current semester must be a valid number greater than 0"),
    ];
};

const updateStudentProfileValidator = () => {
    return [
        body("department").optional().trim().notEmpty(),
        body("currentSemester").optional().isInt({ min: 1 }),
        body("section").optional().trim(),
    ];
};

export { createStudentValidator, updateStudentProfileValidator };
