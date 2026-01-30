import { body } from "express-validator";

const createFeeValidator = () => {
    return [
        body("student").trim().notEmpty().isMongoId().withMessage("Student ID is required"),
        body("amount").notEmpty().isNumeric().withMessage("Amount is required"),
        body("dueDate").notEmpty().isISO8601().withMessage("Due date is required"),
    ];
};

export { createFeeValidator };
