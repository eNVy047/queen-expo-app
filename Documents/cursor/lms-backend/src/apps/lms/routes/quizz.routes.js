import { Router } from "express";
import {
    createQuizz,
    getQuizzes
} from "../controllers/quizz.controller.js";
import { createQuizzValidator } from "../validators/quizz.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createQuizzValidator(), validate, createQuizz)
    .get(getQuizzes);

export default router;
