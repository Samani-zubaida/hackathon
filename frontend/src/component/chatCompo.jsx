import { useState } from "react";
import { useChat } from "../Context/chatContext";
// import { useChat } from "../Context/ChatContext";

const ChatCompo = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, "samani-uid-123"); // pass your logged-in userId
    setInput("");
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-100 px-2 sm:px-4">
        <div className="
          w-full 
          sm:max-w-lg 
          md:max-w-2xl 
          lg:max-w-3xl 
          xl:max-w-4xl 
          h-[90vh] 
          bg-white 
          text-black
          shadow-xl 
          rounded-2xl 
          flex 
          flex-col
        ">
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 gap-3 flex flex-col">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-4 py-2 max-w-[80%] text-sm rounded-2xl ${
                  msg.sender === "bot"
                    ? "self-start bg-gray-200 rounded-bl-md"
                    : "self-end bg-blue-200 rounded-br-md"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center p-3 border-t gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-400 rounded-lg outline-none text-black"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCompo;
