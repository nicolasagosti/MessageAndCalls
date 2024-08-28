import express from "express";
import { CallbackCall, GetToken } from "../controllers/call.controller";

const router = express.Router();

router.post("/callback", CallbackCall);
router.get("/token", GetToken);

export default router;
