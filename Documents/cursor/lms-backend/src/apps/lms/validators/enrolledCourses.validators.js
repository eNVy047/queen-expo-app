import { body } from "express-validator";

const enrollCourseValidator = () => {
    return [
        body("user")
            .trim()
            .notEmpty()
            .withMessage("User ID is required")
            .isMongoId(),
        body("course")
            .trim()
            .notEmpty()
            .withMessage("Course ID is required")
            .isMongoId(),
    ];
};

export { enrollCourseValidator };
