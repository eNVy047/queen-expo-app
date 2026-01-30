import { Router } from "express";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from "../controllers/courses.controller.js";
import {
    createCourseValidator,
    updateCourseValidator
} from "../validators/courses.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createCourseValidator(), validate, createCourse)
    .get(getAllCourses);

router.route("/:id")
    .get(getCourseById)
    .patch(updateCourseValidator(), validate, updateCourse)
    .delete(deleteCourse);

export default router;
