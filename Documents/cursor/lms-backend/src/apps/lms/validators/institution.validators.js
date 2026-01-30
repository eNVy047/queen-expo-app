import { body } from "express-validator";
import { LmsEnum } from "../../../constants.js";

const createInstitutionValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Institution name is required"),
        body("affiliationNumber")
            .trim()
            .notEmpty()
            .withMessage("Affiliation number is required"),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
        body("domain")
            .trim()
            .notEmpty()
            .withMessage("Domain is required"),
        body("phoneNumber")
            .trim()
            .notEmpty()
            .withMessage("Phone number is required"),
        body("address")
            .trim()
            .notEmpty()
            .withMessage("Address is required"),
        body("institutionType")
            .optional()
            .isIn(Object.values(LmsEnum))
            .withMessage("Invalid institution type"),
        body("logo")
            .optional() // Assuming handled by file upload or separate logic, but if string url is passed:
            .isString(),
        // Note: complex file validation usually happens in multer or controller, but basic field check here
    ];
};

const updateInstitutionValidator = () => {
    return [
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Institution name cannot be empty"),
        body("email")
            .optional()
            .trim()
            .isEmail()
            .withMessage("Invalid email format"),
        body("institutionType")
            .optional()
            .isIn(Object.values(LmsEnum))
            .withMessage("Invalid institution type"),
    ];
};

export { createInstitutionValidator, updateInstitutionValidator };
