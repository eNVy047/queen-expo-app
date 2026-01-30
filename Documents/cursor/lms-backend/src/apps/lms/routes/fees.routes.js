import { Router } from "express";
import {
    createFeeRecord,
    getFees
} from "../controllers/fees.controller.js";
import { createFeeValidator } from "../validators/fees.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createFeeValidator(), validate, createFeeRecord)
    .get(getFees);

export default router;
