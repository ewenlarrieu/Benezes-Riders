import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import albumRoutes from "./routes/AlbumRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/albums", albumRoutes);

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT} `);
});

// Connectez-vous à MongoDB
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données MongoDB :", error);
  });
