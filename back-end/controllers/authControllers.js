import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// --- Enregistrement de l'administrateur ---
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérification des champs
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    // Validation username (alphanumérique, 3-30 caractères)
    if (
      !validator.isAlphanumeric(username, "en-US", { ignore: "_-" }) ||
      !validator.isLength(username, { min: 3, max: 30 })
    ) {
      return res.status(400).json({
        message:
          "Le nom d'utilisateur doit contenir 3-30 caractères alphanumériques",
      });
    }

    // Validation password (minimum 8 caractères)
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res
        .status(403)
        .json({ message: "Un administrateur existe déjà." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l’admin
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Administrateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l’enregistrement :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// --- Connexion de l'administrateur ---
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifie si les champs sont remplis
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    // Validation basique (prévention injection)
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Données invalides" });
    }

    // Limite longueur pour éviter abus
    if (username.length > 100 || password.length > 100) {
      return res.status(400).json({ message: "Données trop longues" });
    }

    // Cherche l'admin dans la base de données
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Compare les mots de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Renvoyer le token en JSON (pour localStorage)
    res.status(200).json({
      message: "Connexion réussie.",
      token: token,
    });
  } catch (error) {
    console.error("Erreur de connexion admin:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// --- Déconnexion de l'administrateur ---
export const logoutAdmin = (req, res) => {
  // Le token sera supprimé côté client (localStorage)
  res.status(200).json({ message: "Déconnexion réussie." });
};

// --- Vérifier l'authentification ---
export const checkAuth = (req, res) => {
  // Si ce middleware est atteint, c'est que le token est valide
  res.status(200).json({
    message: "Authentifié",
    admin: {
      id: req.admin.id,
      username: req.admin.username,
    },
  });
};
