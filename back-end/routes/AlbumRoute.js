// Supprimer une photo d'un album

import express from "express";
import multer from "multer";
import {
  creatAlbum,
  updateCover,
  deleteAlbum,
  getAllAlbums,
  getAlbumById,
  addPhotosAlbum,
  deletePhotoFromAlbum,
} from "../controllers/albumController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getAllAlbums);

router.post("/", verifyAdmin, upload.single("cover"), creatAlbum);
router.put("/:id/cover", verifyAdmin, upload.single("cover"), updateCover);
router.delete("/:id", verifyAdmin, deleteAlbum);
router.get("/:id", getAlbumById);

router.post(
  "/:id/photos",
  verifyAdmin,
  upload.array("photos", 10),
  addPhotosAlbum
);
router.delete(
  "/:id/photos",
  verifyAdmin,
  (req, res, next) => {
    if (req.is("application/json")) {
      express.json()(req, res, next);
    } else {
      next();
    }
  },
  deletePhotoFromAlbum
);

export default router;
