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

router.get("/", getAllMembers);

router.post("/", verifyAdmin, upload.single("photo"), createMember);
router.put("/:id", verifyAdmin, upload.single("photo"), updateMember);
router.delete("/:id", verifyAdmin, deleteMember);

export default router;
