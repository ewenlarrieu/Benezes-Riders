import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import albumRoutes from "./routes/AlbumRoute.js";
import eventRoutes from "./routes/eventRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import stripeRoutes from "./routes/StripeRoute.js";

dotenv.config();

const app = express();

// Configuration CORS pour accepter les cookies
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/stripe", stripeRoutes);

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
