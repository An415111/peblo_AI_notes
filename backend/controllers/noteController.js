const Note = require("../models/Note");
const generateSummary = require("../utils/gemini");

// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const note = await Note.create({
      user: req.user,
      title,
      content,
      tags,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user,
    }).sort({ updatedAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ARCHIVE NOTE
const archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.isArchived = true;

    await note.save();

    res.status(200).json({
      message: "Note archived",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const generateAISummary = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const aiResponse = await generateSummary(
      note.content
    );

    note.summary = aiResponse;

    await note.save();

    res.status(200).json({
      summary: aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  archiveNote,
  generateAISummary,
};