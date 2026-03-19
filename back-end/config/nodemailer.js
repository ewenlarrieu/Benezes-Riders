import nodemailer from "nodemailer";

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.EMAIL_USER, // Votre adresse Gmail
    pass: process.env.EMAIL_PASSWORD, // Mot de passe d'application Gmail
  },
});

// Fonction pour envoyer un email
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Benezes Riders" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email envoyé avec succès à ${to}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Erreur envoi email à ${to}:`, error.message);
    throw error;
  }
};

export default transporter;
