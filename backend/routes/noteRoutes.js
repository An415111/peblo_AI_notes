const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  updateNote,
  archiveNote,
  generateAISummary,
} = require("../controllers/noteController");

// CREATE NOTE
router.post("/", protect, createNote);

// GET ALL NOTES
router.get("/", protect, getNotes);

// UPDATE NOTE
router.put("/:id", protect, updateNote);

// ARCHIVE NOTE
router.put("/archive/:id", protect, archiveNote);

// AI SUMMARY
router.post(
  "/ai-summary/:id",
  protect,
  generateAISummary
);

module.exports = router;