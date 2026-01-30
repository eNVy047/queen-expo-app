import { Router } from "express";
import {
    createAssignment,
    submitAssignment,
    getAllAssignments,
    getAssignmentById
} from "../controllers/assignment.controller.js";
import {
    createAssignmentValidator,
    submitAssignmentValidator
} from "../validators/assignment.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createAssignmentValidator(), validate, createAssignment)
    .get(getAllAssignments);

router.route("/submit")
    .post(submitAssignmentValidator(), validate, submitAssignment);

router.route("/:id")
    .get(getAssignmentById);

export default router;
