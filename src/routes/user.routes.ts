import { Router } from "express";
import { getProfile } from "../controllers/user.controller";
import { validate, commonValidators } from "../middlewares/validateInput";

const router = Router();

const profileValidation = validate([commonValidators.uid]);

router.get("/profile/:uid", profileValidation, getProfile);

export default router;
