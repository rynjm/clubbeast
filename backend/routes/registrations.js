const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { eventId, name, email, phone, places } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyRegistered = await Registration.findOne({ user: req.user._id, event: eventId });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "You have already registered for this event" });
    }

    const registration = await Registration.create({
      user: req.user._id,
      event: eventId,
      name,
      email,
      phone,
      places
    });
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ message: "Invalid registration data" });
  }
});

router.get("/myregistrations", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id }).populate("event");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, admin, async (req, res) => {
  try {
    const registrations = await Registration.find({}).populate("user", "name email").populate("event", "title date");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
