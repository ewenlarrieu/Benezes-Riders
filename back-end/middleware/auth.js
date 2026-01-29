import jwt from "jsonwebtoken";

// Middleware pour vérifier le token JWT depuis le header Authorization (admin uniquement)
export function verifyAdmin(req, res, next) {
  // Lire le token depuis le header Authorization
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Non authentifié. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}
