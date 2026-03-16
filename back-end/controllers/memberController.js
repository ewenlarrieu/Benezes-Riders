import fs from "fs";
import "dotenv/config";
import cloudinary from "cloudinary";
import Member from "../models/Member.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Récupérer tous les membres
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des membres" });
  }
};

// Créer un nouveau membre
export const createMember = async (req, res) => {
  let file;
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom est requis" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "La photo est obligatoire" });
    }

    file = req.file.path;

    // Upload de l'image sur Cloudinary
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "members",
    });

    // Supprime le fichier temporaire
    fs.unlink(file, (err) => {
      if (err) console.error("Erreur suppression fichier temporaire:", err);
    });

    const newMember = new Member({
      name,
      photo: result.secure_url,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    // Nettoyer le fichier en cas d'erreur
    if (file) {
      fs.unlink(file, (err) => {
        if (err) console.error("Erreur suppression fichier:", err);
      });
    }
    console.error("Erreur lors de la création du membre:", error);
    res.status(500).json({ message: "Erreur lors de la création du membre" });
  }
};

// Supprimer un membre
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Membre introuvable" });
    }

    // Supprimer l'image de Cloudinary si elle existe
    if (member.photo) {
      try {
        const publicId = member.photo
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.v2.uploader.destroy(publicId);
      } catch (err) {
        console.error("Erreur suppression image Cloudinary:", err);
      }
    }

    await Member.findByIdAndDelete(id);
    res.status(200).json({ message: "Membre supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du membre:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du membre" });
  }
};

// Modifier un membre
export const updateMember = async (req, res) => {
  let file;
  try {
    const { id } = req.params;
    const { name } = req.body;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Membre introuvable" });
    }

    // Mise à jour du nom
    if (name) {
      member.name = name;
    }

    // Mise à jour de la photo si fournie
    if (req.file) {
      file = req.file.path;

      // Supprimer l'ancienne image de Cloudinary
      if (member.photo) {
        try {
          const publicId = member.photo
            .split("/")
            .slice(-2)
            .join("/")
            .split(".")[0];
          await cloudinary.v2.uploader.destroy(publicId);
        } catch (err) {
          console.error("Erreur suppression ancienne image:", err);
        }
      }

      // Upload de la nouvelle image
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: "members",
      });

      member.photo = result.secure_url;

      // Supprime le fichier temporaire
      fs.unlink(file, (err) => {
        if (err) console.error("Erreur suppression fichier temporaire:", err);
      });
    }

    await member.save();
    res.status(200).json(member);
  } catch (error) {
    // Nettoyer le fichier en cas d'erreur
    if (file) {
      fs.unlink(file, (err) => {
        if (err) console.error("Erreur suppression fichier:", err);
      });
    }
    console.error("Erreur lors de la modification du membre:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du membre" });
  }
};
