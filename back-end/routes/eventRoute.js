import express from "express";
import {
  createEvent,
  getAllEvents,
  deleteEvent,
  getEventById,
} from "../controllers/eventController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyAdmin, createEvent);
router.get("/", getAllEvents);
router.delete("/:id", verifyAdmin, deleteEvent);
router.get("/:id", getEventById);

export default router;
