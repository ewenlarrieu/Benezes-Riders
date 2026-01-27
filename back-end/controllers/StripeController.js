import Stripe from "stripe";
import Event from "../models/Event.js";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Crée une session de paiment Stripe
export const createCheckoutSession = async (req, res) => {
  try {
    const { eventId, name, email, phone, message } = req.body;

    //Récuperer l'event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evenement introuvable" });
    }

    //Crée la session de paiement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Inscription - ${event.title}`,
              description: `Du ${event.startDate.toLocaleDateString(
                "fr-FR",
              )}au ${event.endDate.toLocaleDateString("fr-FR")}`,
            },
            unit_amount: event.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/evenements`,
      metadata: {
        eventId: eventId,
        name: name,
        email: email,
        phone: phone || "",
        message: message || "",
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur création session Stripe:", error);
    res.status(500).json({
      message: "Erreur lors de la création de la session de paiement",
    });
  }
};

//Verifier le paiement et enregistrer l'inscription
export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Paiement non confirmé" });
    }

    // Récupérer les métadonnées
    const { eventId, name, email, phone, message } = session.metadata;

    // Enregistrer l'inscription
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    // Vérifier si déjà inscrit
    const alreadyRegistered = event.registrations.some(
      (reg) => reg.email === email && reg.stripeSessionId === sessionId,
    );

    if (!alreadyRegistered) {
      event.registrations.push({
        name,
        email,
        phone: phone || undefined,
        message: message || undefined,
        paymentStatus: "paid",
        stripeSessionId: sessionId,
      });
      await event.save();

      // Envoyer un email de confirmation à l'inscrit
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Benezes Riders" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Confirmation d'inscription - ${event.title}`,
          html: `
            <h2>Inscription confirmée !</h2>
            <p>Bonjour ${name},</p>
            <p>Votre inscription à l'événement <strong>${event.title}</strong> a bien été enregistrée et votre paiement de <strong>${event.price} €</strong> a été validé.</p>
            <h3>Détails de l'événement :</h3>
            <ul>
              <li><strong>Dates :</strong> Du ${new Date(event.startDate).toLocaleDateString("fr-FR")} au ${new Date(event.endDate).toLocaleDateString("fr-FR")}</li>
              <li><strong>Lieu :</strong> ${event.location}</li>
              <li><strong>Prix payé :</strong> ${event.price} €</li>
            </ul>
            <p>Nous avons hâte de vous voir !</p>
            <p>Cordialement,<br>L'équipe Benezes Riders</p>
          `,
        });
      } catch (emailError) {
        console.error("Erreur envoi email confirmation:", emailError);
      }
    }

    res.json({
      success: true,
      message: "Inscription confirmée",
      event: event,
    });
  } catch (error) {
    console.error("Erreur vérification paiement:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification du paiement" });
  }
};
