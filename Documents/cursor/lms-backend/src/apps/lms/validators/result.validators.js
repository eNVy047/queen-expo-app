import { body } from "express-validator";

const createResultValidator = () => {
    return [
        body("student").trim().notEmpty().isMongoId().withMessage("Student ID is required"),
        body("score").notEmpty().isNumeric(),
        body("totalScore").notEmpty().isNumeric(),
    ];
};

export { createResultValidator };
