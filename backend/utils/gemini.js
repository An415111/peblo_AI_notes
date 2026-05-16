const axios = require("axios");

const generateSummary = async (content) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: `
Analyze these notes and provide:

1. Summary
2. Action items
3. Suggested title

Notes:
${content}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(
      "OPENROUTER ERROR:",
      error.response?.data || error.message
    );

    return "AI generation failed";
  }
};

module.exports = generateSummary;