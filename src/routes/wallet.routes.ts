import { Router } from "express";
import { createWallet, getWalletById } from "../controllers/wallet.controller";

const router = Router();

router.get("/detail/:id", getWalletById);
router.post("/create", createWallet);

export default router;
