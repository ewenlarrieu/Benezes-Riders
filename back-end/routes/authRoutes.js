import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  checkAuth,
} from "../controllers/authControllers.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/check", verifyAdmin, checkAuth);

export default router;
