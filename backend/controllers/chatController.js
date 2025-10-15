import fetch from "node-fetch";
import Conversation from "../models/Conversation.js";

export const chatWithAI = async (req, res) => {
  const { userId, message } = req.body;

  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    // Find or create a conversation
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) conversation = new Conversation({ userId, messages: [] });

    // Save user's message
    conversation.messages.push({ sender: "user", content: message });

    const model = "gemini-2.5-pro"; // use the exact model name from your /models list
    const apiKey = process.env.GEMINI_API_KEY;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API status:", response.status, errText);
      return res.json({
        reply: `Gemini API Error: ${response.status} ${response.statusText}`,
      });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    // Save bot message
    conversation.messages.push({ sender: "bot", content: reply });
    await conversation.save();

    return res.json({ reply, conversation });
  } catch (error) {
    console.error("chatWithAI catch error:", error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

