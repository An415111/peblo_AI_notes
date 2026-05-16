const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      default: "Untitled Note",
    },

    content: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    actionItems: {
      type: [String],
      default: [],
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    shareId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);