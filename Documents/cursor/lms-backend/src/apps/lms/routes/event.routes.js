import { Router } from "express";
import {
    createEvent,
    getEvents
} from "../controllers/event.controller.js";
import { createEventValidator } from "../validators/event.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createEventValidator(), validate, createEvent)
    .get(getEvents);

export default router;
