import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs." });
    }
    if (
      !validator.isAlphanumeric(username, "en-US", { ignore: "_-" }) ||
      !validator.isLength(username, { min: 3, max: 30 })
    ) {
      return res.status(400).json({
        message:
          "Le nom d'utilisateur doit contenir 3-30 caractères alphanumériques",
      });
    }
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Administrateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l’enregistrement :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs." });
    }
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Données invalides" });
    }
    if (username.length > 100 || password.length > 100) {
      return res.status(400).json({ message: "Données trop longues" });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token: token,
    });
  } catch (error) {
    console.error("Erreur de connexion admin:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const logoutAdmin = (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie." });
};

export const checkAuth = (req, res) => {
  res.status(200).json({
    message: "Authentifié",
    admin: {
      id: req.admin.id,
      username: req.admin.username,
    },
  });
};
