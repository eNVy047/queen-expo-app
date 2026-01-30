import { Router } from "express";
import {
    toggleLike
} from "../controllers/like.controller.js";
import { toggleLikeValidator } from "../validators/like.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(toggleLikeValidator(), validate, toggleLike);

export default router;
