import Event from "../models/Event.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
import validator from "validator";

export const createEvent = async (req, res) => {
  try {
    let { title, startDate, endDate, location, description, price } = req.body;

    if (
      !title ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      price === undefined ||
      price === null
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sanitization
    title = validator.trim(validator.escape(title));
    location = validator.trim(validator.escape(location));
    description = validator.trim(validator.escape(description));

    // Validation longueurs
    if (!validator.isLength(title, { min: 3, max: 200 })) {
      return res
        .status(400)
        .json({ message: "Le titre doit contenir 3-200 caractères" });
    }

    // Validation dates
    if (!validator.isISO8601(startDate) || !validator.isISO8601(endDate)) {
      return res.status(400).json({ message: "Format de date invalide" });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "La date de début doit être avant la date de fin" });
    }

    // Validation prix
    if (typeof price !== "number" || price < 0 || price > 10000) {
      return res.status(400).json({ message: "Prix invalide (0-10000)" });
    }

    const newEvent = new Event({
      title,
      startDate,
      endDate,
      location,
      description,
      price,
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({
      message: "Erreur lors de la recuperation des evenements",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEvent = await Event.findByIdAndDelete(id); // Ajout de 'await'

    if (!deleteEvent) {
      return res.status(404).json({
        message: "Evenement non trouvé",
      });
    }

    res.status(200).json({
      message: "Evenement supprimé",
      event: deleteEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'evenement",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Evenement non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Error getting Event:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'evenement",
    });
  }
};

export const registerToEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, phone, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Nom et email requis" });
    }

    // Sanitization
    name = validator.trim(validator.escape(name));
    email = validator.trim(email.toLowerCase()); // Seulement trim et lowercase, pas de normalizeEmail agressif
    if (phone) {
      // Nettoyer le téléphone (retirer espaces, tirets, points)
      phone = validator.trim(phone).replace(/[\s\-\.]/g, "");
    }
    if (message) message = validator.trim(validator.escape(message));

    // Validation email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }
    
    console.log(`📧 Tentative d'inscription - Email: ${email}, Nom: ${name}`);

    // Validation nom (2-100 caractères)
    if (!validator.isLength(name, { min: 2, max: 100 })) {
      return res
        .status(400)
        .json({ message: "Le nom doit contenir 2-100 caractères" });
    }

    // Validation téléphone si fourni (après nettoyage)
    if (phone && phone.length > 0 && !validator.isMobilePhone(phone, "any")) {
      return res.status(400).json({ message: "Numéro de téléphone invalide" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Evenement non trouvé" });
    }

    const registration = {
      name,
      email,
      phone,
      message,
      createdAt: new Date(),
    };

    event.registrations.push(registration);
    await event.save();

    // Envoyer un email de confirmation à l'inscrit avec retry
    let emailSent = false;
    let emailError = null;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`📨 Tentative ${attempt}/3 d'envoi email à ${email}`);
        
        const result = await resend.emails.send({
          from: "Benezes Riders <onboarding@resend.dev>",
          to: email,
          subject: `Confirmation d'inscription - ${event.title}`,
          html: `
            <h2>Inscription confirmée !</h2>
            <p>Bonjour ${name},</p>
            <p>Votre inscription à l'événement <strong>${event.title}</strong> a bien été enregistrée.</p>
            <h3>Détails de l'événement :</h3>
            <ul>
              <li><strong>Dates :</strong> Du ${new Date(event.startDate).toLocaleDateString("fr-FR")} au ${new Date(event.endDate).toLocaleDateString("fr-FR")}</li>
              <li><strong>Lieu :</strong> ${event.location}</li>
              <li><strong>Prix :</strong> Gratuit</li>
            </ul>
            <p>Nous avons hâte de vous voir !</p>
            <p>Cordialement,<br>L'équipe Benezes Riders</p>
          `,
        });
        
        console.log(`✅ Email envoyé avec succès à ${email}:`, result);
        emailSent = true;
        break; // Sortir si succès
      } catch (error) {
        emailError = error;
        console.error(`❌ Erreur tentative ${attempt}/3 pour ${email}:`, error.message);
        
        // Attendre 2 secondes avant de réessayer
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    if (!emailSent) {
      console.error(`🚨 ÉCHEC FINAL: Impossible d'envoyer l'email à ${email} après 3 tentatives:`, emailError);
    }

    res.status(201).json({
      message: "Inscription enregistrée",
      registration,
      emailSent, // Indiquer si l'email a été envoyé
    });
  } catch (error) {
    console.error("Error registering to event:", error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startDate, endDate, location, description, price } =
      req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Evenement non trouve",
      });
    }
    event.title = title ?? event.title;
    event.startDate = startDate ?? event.startDate;
    event.endDate = endDate ?? event.endDate;
    event.location = location ?? event.location;
    event.description = description ?? event.description;
    event.price = price ?? event.price;

    await event.save();

    res.status(200).json({
      message: "Evenement modifier",
      event,
    });
  } catch (error) {
    console.error("Error updating Event:", error);
    res.status(500).json({
      message: "Erreur lors de la modification de l'evenement",
    });
  }
};

export const getNextEvent = async (req, res) => {
  try {
    const today = new Date();
    const event = await Event.findOne({ startDate: { $gte: today } }).sort({
      startDate: 1,
    });
    if (!event) {
      return res.status(200).json({ message: "Aucun événement à venir" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
