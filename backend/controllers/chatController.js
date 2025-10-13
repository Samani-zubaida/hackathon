import fetch from "node-fetch";
import  Conversation from "../models/Conversation.js";

export const chatWithAI = async (req, res) => {
  const { userId, message } = req.body;

  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    // Get previous chat
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    // Save user message
    conversation.messages.push({ sender: "user", content: message });

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Save bot reply
    conversation.messages.push({ sender: "bot", content: reply });
    await conversation.save();

    res.json({ reply, conversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
