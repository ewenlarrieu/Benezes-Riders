import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, startDate, endDate, location, description, price } =
      req.body;

    if (
      !title ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required" });
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
    const { name, email, phone, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Nom et email requis" });
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

    res.status(201).json({
      message: "Inscription enregistrée",
      registration,
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
