import express from "express";
import { createEvent } from "../controllers/eventController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyAdmin, createEvent);

export default router;
