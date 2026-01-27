import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    // Envoie le token dans un cookie HttpOnly
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 heure en millisecondes
    });

    res.status(200).json({
      message: "Connexion réussie.",
    });
  } catch (error) {
    console.error("Erreur de connexion admin:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// --- Déconnexion de l'administrateur ---
export const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
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
