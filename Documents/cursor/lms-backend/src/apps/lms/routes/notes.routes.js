import { Router } from "express";
import {
    createNotes,
    getNotes
} from "../controllers/notes.controller.js";
import { createNotesValidator } from "../validators/notes.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createNotesValidator(), validate, createNotes)
    .get(getNotes);

export default router;
