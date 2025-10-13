import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        userId: "demoUser",
        message: input,
      });

      const botMessage = { sender: "bot", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Chatbot</h1>

      <div className="w-96 h-96 bg-gray-800 rounded-xl p-4 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`my-2 ${msg.sender === "user" ? "text-blue-400" : "text-green-400"}`}>
            <b>{msg.sender === "user" ? "You:" : "Bot:"}</b> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex w-96">
        <input
          className="flex-grow p-2 rounded-l-md text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 rounded-r-md">
          Send
        </button>
      </div>
    </div>
  );
}
