import { body } from "express-validator";

const createEventValidator = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("description").trim().notEmpty().withMessage("Description is required"),
        body("date").notEmpty().isISO8601().withMessage("Date is required"),
        body("venue").trim().notEmpty().withMessage("Venue is required"),
    ];
};

export { createEventValidator };
