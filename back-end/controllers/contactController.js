import nodemailer from "nodemailer";
import validator from "validator";

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true, // SSL pour port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Envoyer un message de contact
export const sendContactMessage = async (req, res) => {
  try {
    let { fullname, email, subject, message } = req.body;

    // Validation des champs
    if (!fullname || !email || !subject || !message) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    // Sanitization (trim et escape HTML)
    fullname = validator.trim(validator.escape(fullname));
    subject = validator.trim(validator.escape(subject));
    message = validator.trim(validator.escape(message));
    email = validator.normalizeEmail(email);

    // Validation email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // Validation longueurs
    if (!validator.isLength(fullname, { min: 2, max: 100 })) {
      return res
        .status(400)
        .json({ message: "Le nom doit contenir 2-100 caractères" });
    }

    if (!validator.isLength(subject, { min: 3, max: 200 })) {
      return res
        .status(400)
        .json({ message: "L'objet doit contenir 3-200 caractères" });
    }

    if (!validator.isLength(message, { min: 10, max: 2000 })) {
      return res
        .status(400)
        .json({ message: "Le message doit contenir 10-2000 caractères" });
    }

    const transporter = createTransporter();

    // Configuration de l'email
    const mailOptions = {
      from: `"Benezes Riders Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT, // Email où vous recevrez les messages
      replyTo: email,
      subject: `[Contact Benezes Riders] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #1E1E1E; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">Nouveau message de contact</h2>
          </div>
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>De :</strong> ${fullname}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
            <p style="font-size: 16px; margin-bottom: 20px;"><strong>Objet :</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Message :</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #1E1E1E; border-radius: 5px;">
              <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
            </div>
          </div>
          <div style="text-align: center; padding-top: 20px; color: #666; font-size: 12px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site Benezes Riders</p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact

De : ${fullname}
Email : ${email}
Objet : ${subject}

Message :
${message}
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message envoyé avec succès ! Nous vous répondrons rapidement.",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({
      message:
        "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
