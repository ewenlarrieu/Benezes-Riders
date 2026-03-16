import express from "express";
import multer from "multer";
import {
  getAllMembers,
  createMember,
  deleteMember,
  updateMember,
} from "../controllers/memberController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes publiques
router.get("/", getAllMembers);

// Routes protégées (admin uniquement)
router.post("/", verifyAdmin, upload.single("photo"), createMember);
router.put("/:id", verifyAdmin, upload.single("photo"), updateMember);
router.delete("/:id", verifyAdmin, deleteMember);

export default router;
