import { Router } from "express";
import {
    createInstitutionSetup,
    getInstitutionSetup,
    updateInstitutionSetup
} from "../controllers/institutionSetup.controller.js";
import {
    createInstitutionSetupValidator,
    updateInstitutionSetupValidator
} from "../validators/institutionSetup.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createInstitutionSetupValidator(), validate, createInstitutionSetup);

router.route("/:institutionId")
    .get(getInstitutionSetup);

router.route("/:id")
    .patch(updateInstitutionSetupValidator(), validate, updateInstitutionSetup);

export default router;
