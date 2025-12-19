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
