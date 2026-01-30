import { Router } from "express";
import {
    createStudent,
    getStudentProfile,
    getStudentById,
    updateStudentProfile,
    getAllStudents
} from "../controllers/student.controller.js";
import {
    createStudentValidator,
    updateStudentProfileValidator
} from "../validators/student.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createStudentValidator(), validate, createStudent)
    .get(getAllStudents);

router.route("/profile")
    .get(getStudentProfile);

router.route("/:id")
    .get(getStudentById)
    .patch(updateStudentProfileValidator(), validate, updateStudentProfile);

export default router;
