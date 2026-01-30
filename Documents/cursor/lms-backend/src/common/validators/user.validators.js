import { body, param } from "express-validator";
import { AvailableUserRoles } from "../../constants.js";

const userRegisterValidator = () => {
  return [
    // 📧 Email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    // 📞 Phone (as object)
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .custom((value) => {
        // ensure it's an object
        if (typeof value !== "object" || Array.isArray(value)) {
          throw new Error("Phone number must be an object");
        }

        // ensure both fields exist
        if (!value.countryCode || !value.number) {
          throw new Error("Phone number must include countryCode and number");
        }

        // basic pattern check
        if (!/^\+\d{1,4}$/.test(value.countryCode)) {
          throw new Error("Invalid country code format (e.g. +91)");
        }

        if (!/^\d{7,15}$/.test(value.number)) {
          throw new Error("Invalid phone number format");
        }

        return true;
      }),


    // 🏠 Address
    body("address")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Address cannot be empty"),
    // 🔒 Password
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),

    // 👑 Role (optional)
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgottenPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

export {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
  userAssignRoleValidator,
};
