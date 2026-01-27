import jwt from "jsonwebtoken";

// Middleware pour vérifier le token JWT depuis le cookie (admin uniquement)
export function verifyAdmin(req, res, next) {
  const token = req.cookies.adminToken;

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
