import { Router } from "express";
import {
    createAnnouncement,
    getAnnouncements
} from "../controllers/announcement.controller.js";
import { createAnnouncementValidator } from "../validators/announcement.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createAnnouncementValidator(), validate, createAnnouncement)
    .get(getAnnouncements);

export default router;
