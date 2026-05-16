import axios from "axios";

const API = "https://peblo-ai-notes-8ee0.onrender.com";

// CREATE NOTE
export const createNote = async (
  noteData,
  token
) => {
  const response = await axios.post(
    `${API}/notes`,
    noteData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// GET NOTES
export const getNotes = async (token) => {
  const response = await axios.get(
    `${API}/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// GENERATE AI SUMMARY
export const generateSummary = async (
  noteId,
  token
) => {
  const response = await axios.post(
    `${API}/notes/ai-summary/${noteId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};