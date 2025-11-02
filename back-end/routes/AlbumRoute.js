import express from "express";
import multer from "multer";
import {
  creatAlbum,
  updateCover,
  deleteAlbum,
  getAllAlbums,
} from "../controllers/albumController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getAllAlbums);
router.post("/", verifyAdmin, upload.single("cover"), creatAlbum);
router.put("/:id/cover", verifyAdmin, upload.single("cover"), updateCover);
router.delete("/:id", verifyAdmin, deleteAlbum);

export default router;
