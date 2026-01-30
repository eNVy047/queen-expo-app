import { Router } from "express";
import {
    addComment,
    getComments
} from "../controllers/comment.controller.js";
import { createCommentValidator } from "../validators/comment.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createCommentValidator(), validate, addComment);

router.route("/post/:postId")
    .get(getComments);

export default router;
