import { Router } from "express";
import {
    createInstitution,
    getAllInstitutions,
    getInstitutionById,
    updateInstitution,
    deleteInstitution
} from "../controllers/institution.controller.js";
import {
    createInstitutionValidator,
    updateInstitutionValidator
} from "../validators/institution.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT); // Protect all routes

router.route("/")
    .post(createInstitutionValidator(), validate, createInstitution)
    .get(getAllInstitutions);

router.route("/:id")
    .get(getInstitutionById)
    .patch(updateInstitutionValidator(), validate, updateInstitution)
    .delete(deleteInstitution);

export default router;
