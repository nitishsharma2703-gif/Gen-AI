import { useState, useRef, useEffect } from "react";
import { Plus, Mic } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [messagesStore, setMessagesStore] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const fileRef = useRef();
  const bottomRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // const handleSend = () => {
  //   if (!input.trim()) return;

  //   const userMsg = { role: "user", text: input };
  //   const botMsg = { role: "bot", text: "Thinking..." };

  //   const updatedMessages = [...messages, userMsg, botMsg];
  //   setMessages(updatedMessages);
  //   setInput("");

  //   setTimeout(() => {
  //     const finalMessages = updatedMessages.map((msg, i) =>
  //       i === updatedMessages.length - 1
  //         ? { ...msg, text: "AI response 😌" }
  //         : msg
  //     );

  //     setMessages(finalMessages);

  //     if (activeChat === null) {
  //       const newIndex = chats.length;

  //       setChats((prev) => [...prev, input]);
  //       setMessagesStore((prev) => [...prev, finalMessages]);
  //       setActiveChat(newIndex);
  //     } else {
  //       const updatedStore = [...messagesStore];
  //       updatedStore[activeChat] = finalMessages;
  //       setMessagesStore(updatedStore);
  //     }
  //   }, 1000);
  // };

  
const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { role: "user", text: input };
  const botMsg = { role: "bot", text: "Thinking..." };

  const updatedMessages = [...messages, userMsg, botMsg];
  setMessages(updatedMessages);

  const currentInput = input;
  setInput("");

  try {
    const aiResponse = await generateAI(currentInput);

    const finalMessages = updatedMessages.map((msg, i) =>
      i === updatedMessages.length - 1
        ? { ...msg, text: aiResponse }
        : msg
    );

    setMessages(finalMessages);

  } catch (error) {
    const finalMessages = updatedMessages.map((msg, i) =>
      i === updatedMessages.length - 1
        ? { ...msg, text: "Error 😢" }
        : msg
    );

    setMessages(finalMessages);
  }
};
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-black text-white">
      
      <Sidebar
        chats={chats}
        setChats={setChats}
        messagesStore={messagesStore}
        setMessagesStore={setMessagesStore} // ✅ FIX
        setMessages={setMessages}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        
        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 && (
            <h1 className="text-center text-3xl text-gray-400 mt-20">
              What’s on your mind?
            </h1>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-2xl ${
                msg.role === "user"
                  ? "ml-auto text-right"
                  : "mr-auto"
              }`}
            >
              <div
                className={`p-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-cyan-600"
                    : "bg-[#2a2a2a]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center bg-[#2f2f2f] p-3 rounded-xl gap-3">
            
            <button onClick={() => fileRef.current.click()}>
              <Plus />
            </button>

            <input type="file" ref={fileRef} className="hidden" />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none"
            />

            <button>
              <Mic />
            </button>

            <button
              onClick={handleSend}
              className="bg-white text-black px-3 py-1 rounded-full"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}