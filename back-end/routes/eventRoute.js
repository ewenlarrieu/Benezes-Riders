import express from "express";
import rateLimit from "express-rate-limit";
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

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: "Trop d'inscriptions, réessayez dans 1 heure" },
});

router.post("/", verifyAdmin, createEvent);
router.get("/", getAllEvents);
router.delete("/:id", verifyAdmin, deleteEvent);
router.get("/next", getNextEvent);
router.post("/:id/register", registerLimiter, registerToEvent);
router.get("/:id", getEventById);
router.put("/:id", verifyAdmin, updateEvent);

export default router;
