import { Router } from "express";
import {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
} from "../controllers/subjects.controller.js";
import {
    createSubjectValidator,
    updateSubjectValidator
} from "../validators/subjects.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createSubjectValidator(), validate, createSubject)
    .get(getAllSubjects);

router.route("/:id")
    .get(getSubjectById)
    .patch(updateSubjectValidator(), validate, updateSubject)
    .delete(deleteSubject);

export default router;
