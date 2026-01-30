import { Router } from "express";
import {
    createVideo,
    getVideos
} from "../controllers/video.controller.js";
import { createVideoValidator } from "../validators/video.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createVideoValidator(), validate, createVideo)
    .get(getVideos);

export default router;
