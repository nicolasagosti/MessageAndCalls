import express from "express";
import { SendMessage } from "../controllers/sms.controller";

const router = express.Router();

router.post("/", SendMessage);

export default router;
