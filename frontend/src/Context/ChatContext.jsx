import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Send message to backend
  const sendToAI = async (userId, text) => {
    try {
      const res = await fetch("http://localhost:5000/api/chat/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: text }),
      });

      const data = await res.json();
      return data.reply;
    } catch (err) {
      return "Could not connect to AI server.";
    }
  };

  const sendMessage = async (text, userId = "default-user") => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Ask Backend API
    const aiReply = await sendToAI(userId, text);

    // 3. Add Bot Response
    const botMsg = { sender: "bot", text: aiReply };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
