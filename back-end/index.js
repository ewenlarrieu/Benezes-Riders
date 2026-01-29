import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import albumRoutes from "./routes/AlbumRoute.js";
import eventRoutes from "./routes/eventRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import stripeRoutes from "./routes/StripeRoute.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Trop de tentatives, réessayez dans 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

const eventRegisterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: "Trop d'inscriptions, réessayez plus tard" },
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/stripe", stripeRoutes);

export { authLimiter };

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT} `);
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données MongoDB :", error);
  });
