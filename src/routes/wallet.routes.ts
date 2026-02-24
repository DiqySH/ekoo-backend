import { Router } from "express";
import { getWalletById } from "../controllers/wallet.controller";

const router = Router();

router.get("/detail/:id", getWalletById);

export default router;
