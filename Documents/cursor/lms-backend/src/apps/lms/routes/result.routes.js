import { Router } from "express";
import {
    createResult,
    getResults
} from "../controllers/result.controller.js";
import { createResultValidator } from "../validators/result.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createResultValidator(), validate, createResult)
    .get(getResults);

export default router;
