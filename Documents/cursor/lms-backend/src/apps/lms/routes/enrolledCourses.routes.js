import { Router } from "express";
import {
    enrollUserInCourse,
    getUserEnrollments,
    removeEnrollment
} from "../controllers/enrolledCourses.controller.js";
import { enrollCourseValidator } from "../validators/enrolledCourses.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(enrollCourseValidator(), validate, enrollUserInCourse);

router.route("/user")
    .get(getUserEnrollments);

router.route("/user/:userId")
    .get(getUserEnrollments);

router.route("/:id")
    .delete(removeEnrollment);

export default router;
