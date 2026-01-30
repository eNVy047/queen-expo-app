import { body } from "express-validator";

const createBranchValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Branch name is required"),
        body("owner")
            .trim()
            .notEmpty()
            .withMessage("Owner (Institution) ID is required")
            .isMongoId(),
    ];
};

const updateBranchValidator = () => {
    return [
        body("name").optional().trim().notEmpty(),
    ];
};

export { createBranchValidator, updateBranchValidator };
