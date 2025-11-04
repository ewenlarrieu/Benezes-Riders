// Supprimer une photo d'un album
export const deletePhotoFromAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { photoUrl } = req.body;
    if (!photoUrl) {
      return res.status(400).json({ message: "Aucune photo spécifiée" });
    }
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: "Album introuvable" });
    }
    const photoIndex = album.photos.indexOf(photoUrl);
    if (photoIndex === -1) {
      return res
        .status(404)
        .json({ message: "Photo non trouvée dans l'album" });
    }
    album.photos.splice(photoIndex, 1);
    await album.save();
    res.status(200).json({ message: "Photo supprimée", album });
  } catch (error) {
    console.error("Erreur lors de la suppression de la photo:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la photo" });
  }
};
import fs from "fs";
import "dotenv/config";
import cloudinary from "cloudinary";
import Album from "../models/Album.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Récupère tous les albums
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.status(200).json(albums);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des albums" });
  }
};

//Crée  un album ave image de couverture
export const creatAlbum = async (req, res) => {
  let file;
  try {
    const { title } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "L'image de couverture est obligatoire." });
    }
    file = req.file.path;

    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "album/covers",
    });

    // Supprime le fichier temporaire après upload
    fs.unlink(file, (err) => {
      if (err) console.error("Erreur suppression fichier temporaire:", err);
    });

    const newAlbum = new Album({
      title,
      coverImage: result.secure_url,
    });

    await newAlbum.save();

    res.status(201).json(newAlbum);
  } catch (error) {
    // Supprime le fichier temporaire en cas d'erreur
    if (file) fs.unlink(file, () => {});
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'album" });
  }
};

//Modifier l'image de couverture
export const updateCover = async (req, res) => {
  let file;
  try {
    const { id } = req.params;
    const { title } = req.body;
    let updateFields = {};

    // Si un fichier est envoyé, upload sur Cloudinary
    if (req.file) {
      file = req.file.path;
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: "album/covers",
      });
      updateFields.coverImage = result.secure_url;
      // Supprime le fichier temporaire après upload
      fs.unlink(file, (err) => {
        if (err) console.error("Erreur suppression fichier temporaire:", err);
      });
    }
    // Si un titre est envoyé, on le met à jour
    if (title) {
      updateFields.title = title;
    }
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune donnée à mettre à jour." });
    }
    const updateAlbum = await Album.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.status(200).json(updateAlbum);
  } catch (error) {
    if (file) fs.unlink(file, () => {});
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la modification de l'album",
    });
  }
};

// Supprime un album par son id
export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Album.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Album non trouvé" });
    }
    res.status(200).json({ message: "Album supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'album" });
  }
};

// Récupérer un album par son id
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album introuvable" });
    }
    res.status(200).json(album);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'album" });
  }
};

// Ajouter des photos dans un album existant

export const addPhotosAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ message: "Album introuvable" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Aucune photo envoyée" });
    }

    const uploadedPhotos = [];

    for (const file of req.files) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: `album/photos/${album.title}`,
      });
      uploadedPhotos.push(result.secure_url);
      fs.unlink(file.path, (err) => {
        if (err) console.error("Erreur suppression fichier:", err);
      });
    }
    // Mise à jour du tableau "photos" de l'album
    album.photos.push(...uploadedPhotos);
    await album.save();

    res.status(200).json({
      message: `${uploadedPhotos.length} photo(s) ajoutée(s) avec succès`,
      album,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de photos :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de photos", error });
  }
};
