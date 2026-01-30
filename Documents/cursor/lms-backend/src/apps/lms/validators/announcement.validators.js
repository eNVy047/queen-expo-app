import { body } from "express-validator";

const createAnnouncementValidator = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("content").trim().notEmpty().withMessage("Content is required"),
        body("authorModel").isIn(["User", "Institution"]).withMessage("Invalid author model"),
    ];
};

export { createAnnouncementValidator };
