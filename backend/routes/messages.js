const express = require("express");
const Message = require("../models/Message");
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const router = express.Router();

// @desc    Send a message
// @route   POST /api/messages
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: "Invalid message data" });
  }
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      res.json({ message: "Message removed" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
