import Event from "../models/Event.js";
import validator from "validator";

export const createEvent = async (req, res) => {
  try {
    let {
      title,
      startDate,
      endDate,
      location,
      description,
      price,
      helloAssoLink,
    } = req.body;

    if (
      !title ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      price === undefined ||
      price === null ||
      !helloAssoLink
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    title = validator.trim(validator.escape(title));
    location = validator.trim(validator.escape(location));
    description = validator.trim(validator.escape(description));
    helloAssoLink = validator.trim(helloAssoLink);

    if (
      !validator.isURL(helloAssoLink, {
        protocols: ["http", "https"],
        require_protocol: true,
      })
    ) {
      return res.status(400).json({ message: "Lien HelloAsso invalide" });
    }

    if (!validator.isLength(title, { min: 3, max: 200 })) {
      return res
        .status(400)
        .json({ message: "Le titre doit contenir 3-200 caractères" });
    }

    if (!validator.isISO8601(startDate) || !validator.isISO8601(endDate)) {
      return res.status(400).json({ message: "Format de date invalide" });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "La date de début doit être avant la date de fin" });
    }

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
      helloAssoLink,
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

    const deleteEvent = await Event.findByIdAndDelete(id);

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

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      startDate,
      endDate,
      location,
      description,
      price,
      helloAssoLink,
    } = req.body;

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
    event.helloAssoLink = helloAssoLink ?? event.helloAssoLink;

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
