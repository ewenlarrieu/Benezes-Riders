import express from "express";
import rateLimit from "express-rate-limit";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  checkAuth,
} from "../controllers/authControllers.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Rate limiter spécifique pour login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives max
  message: { message: "Trop de tentatives, réessayez dans 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", authLimiter, registerAdmin);
router.post("/login", authLimiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/check", verifyAdmin, checkAuth); // Pas de rate limiter ici

export default router;
