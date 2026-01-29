import express from "express";
import {
  createEvent,
  getAllEvents,
  deleteEvent,
  getEventById,
  updateEvent,
  getNextEvent,
  registerToEvent,
} from "../controllers/eventController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyAdmin, createEvent);
router.get("/", getAllEvents);
router.delete("/:id", verifyAdmin, deleteEvent);
router.get("/next", getNextEvent);
router.post("/:id/register", registerToEvent);
router.get("/:id", getEventById);
router.put("/:id", verifyAdmin, updateEvent);

export default router;
