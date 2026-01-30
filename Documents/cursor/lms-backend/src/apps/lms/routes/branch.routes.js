import { Router } from "express";
import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch
} from "../controllers/branch.controller.js";
import {
    createBranchValidator,
    updateBranchValidator
} from "../validators/branch.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createBranchValidator(), validate, createBranch)
    .get(getAllBranches);

router.route("/:id")
    .get(getBranchById)
    .patch(updateBranchValidator(), validate, updateBranch)
    .delete(deleteBranch);

export default router;
