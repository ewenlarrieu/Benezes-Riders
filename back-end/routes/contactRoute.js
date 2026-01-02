import express from "express";
import { sendContactMessage } from "../controllers/contactController.js";

const router = express.Router();

// POST /api/contact - Envoyer un message de contact
router.post("/", sendContactMessage);

export default router;
