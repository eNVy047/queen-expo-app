import { Router } from "express";
import {
    createTeacher,
    getTeacherProfile,
    getTeacherById,
    updateTeacherProfile,
    getAllTeachers
} from "../controllers/teacher.controller.js";
import {
    createTeacherValidator,
    updateTeacherProfileValidator
} from "../validators/teacher.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createTeacherValidator(), validate, createTeacher)
    .get(getAllTeachers);

router.route("/profile")
    .get(getTeacherProfile);

router.route("/:id")
    .get(getTeacherById)
    .patch(updateTeacherProfileValidator(), validate, updateTeacherProfile);

export default router;
