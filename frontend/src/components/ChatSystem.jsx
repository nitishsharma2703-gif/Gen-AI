import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Trash2,
  LogOut,
  User,
  Image as ImageIcon,
  Grid,
  Heart,
  Settings,
  HelpCircle,
  Compass,
  PlusSquare,
  Menu,
  X,
} from "lucide-react";
import { generateAI } from "../services/auth.api";

// ─── 3D BOY MODEL ─────────────────
function BoyModel() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <group ref={ref} position={[0, -1, 0]} scale={1.2}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#E8B4A4" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.55, 0.45]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[-0.15, 1.55, 0.48]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      <mesh position={[0.15, 1.55, 0.45]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0.15, 1.55, 0.48]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.45, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial color="#900" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2D2D2D" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.6, 1, 0.4]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 1, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#E8B4A4" />
      </mesh>
      <mesh position={[0.5, 1, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#E8B4A4" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
    </group>
  );
}

// ─── SIDEBAR ITEM ─────────────────
const SideMenuItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer text-sm text-gray-200 transition"
  >
    {icon}
    <span>{text}</span>
  </div>
);

// ─── LEFT PANEL (SLIDE-IN DRAWER ON MOBILE) ─────────────────
function LeftPanel({
  chats,
  setChats,
  messagesStore,
  setMessagesStore,
  setMessages,
  activeChat,
  setActiveChat,
  onLogout,
  isOpen,
  setIsOpen,
}) {
  const [search, setSearch] = useState("");
  const filteredChats = chats.filter((chat) =>
    chat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`fixed md:relative top-0 left-0 h-dvh md:h-screen w-72 z-50 md:z-10 transition-transform duration-300 md:transform-none overflow-hidden flex flex-col ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#06b6d420,transparent),radial-gradient(circle_at_80%_70%,#a855f720,transparent),#020617]" />
      
      {/* 3D Model loaded only on Desktop for optimal Mobile Performance */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <Environment preset="city" />
          <BoyModel />
          <Sphere args={[50, 64, 64]}>
            <meshBasicMaterial color="#020617" side={THREE.BackSide} />
          </Sphere>
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between bg-slate-950/95 md:bg-black/40 border-r border-cyan-400/10">
        <div className="p-3 space-y-3 overflow-y-auto flex-1 no-scrollbar">
          {/* Close button inside mobile menu */}
          <div className="flex md:hidden justify-end">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 p-1">
              <X size={20} />
            </button>
          </div>

          <SideMenuItem
            icon={<PlusSquare size={18} />}
            text="New chat"
            onClick={() => {
              const newChatName = `Chat ${chats.length + 1}`;
              setChats([newChatName, ...chats]);
              setMessagesStore([[], ...messagesStore]);
              setMessages([]);
              setActiveChat(0);
              setIsOpen(false);
            }}
          />

          <div className="flex items-center gap-2 px-3 py-2 bg-black/30 rounded-lg border border-cyan-400/20">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats"
              className="bg-transparent outline-none text-sm flex-1 text-white"
            />
          </div>

          <SideMenuItem icon={<ImageIcon size={18} />} text="Images" />
          <SideMenuItem icon={<Grid size={18} />} text="Apps" />
          <SideMenuItem icon={<Compass size={18} />} text="Research" />
          <SideMenuItem icon={<Heart size={18} />} text="Health" />

          <div className="space-y-1 pt-2 border-t border-cyan-400/10">
            {filteredChats.map((chat, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveChat(i);
                  setMessages(messagesStore[i] || []);
                  setIsOpen(false);
                }}
                className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition text-sm ${
                  activeChat === i ? "bg-cyan-500/20 border border-cyan-400/30 text-white" : "hover:bg-cyan-500/10 text-gray-300"
                }`}
              >
                <span className="truncate flex-1 pr-2">{chat}</span>
                <Trash2
                  size={14}
                  className="text-gray-400 hover:text-red-400 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newChats = chats.filter((_, idx) => idx !== i);
                    const newStore = messagesStore.filter((_, idx) => idx !== i);
                    setChats(newChats);
                    setMessagesStore(newStore);
                    setMessages([]);
                    if (activeChat === i) setActiveChat(null);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 space-y-2 border-t border-cyan-400/10 bg-slate-950">
          <SideMenuItem icon={<Settings size={18} />} text="Settings" />
          <SideMenuItem icon={<HelpCircle size={18} />} text="Help" />
          <div className="flex items-center gap-2 px-3 py-1 text-gray-300 text-sm">
            <User size={18} className="text-cyan-400" /> Nitish
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg w-full text-sm transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN RESPONSIVE VIEW INTERFACE ─────────────────
export default function MergedPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [messagesStore, setMessagesStore] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const bottomRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Safe manual sync function without background loop collisions
  const syncChatState = (targetIndex, updatedList) => {
    setMessages(updatedList);
    if (targetIndex !== null) {
      setMessagesStore((prev) => {
        const nextStore = [...prev];
        nextStore[targetIndex] = updatedList;
        return nextStore;
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loadingAI) return;

    let currentChatIdx = activeChat;
    if (currentChatIdx === null) {
      const defaultChatName = `Chat ${chats.length + 1}`;
      setChats([defaultChatName, ...chats]);
      setMessagesStore([[], ...messagesStore]);
      currentChatIdx = 0;
      setActiveChat(0);
    }

    const userMessage = { role: "user", text: input };
    const thinkingMessage = { role: "bot", text: "Thinking..." };
    
    const currentHistory = messagesStore[currentChatIdx] || [];
    const step1Messages = [...currentHistory, userMessage, thinkingMessage];
    
    syncChatState(currentChatIdx, step1Messages);
    setInput("");
    setLoadingAI(true);

    try {
      const res = await generateAI(input);
      const aiText = res?.data?.result || res?.data?.message || res?.result || res?.message || "No response";
      
      const step2Messages = [...step1Messages.slice(0, -1), { role: "bot", text: aiText }];
      syncChatState(currentChatIdx, step2Messages);
    } catch (err) {
      console.error("AI Error:", err);
      const errorMessages = [...step1Messages.slice(0, -1), { role: "bot", text: "Error 😢" }];
      syncChatState(currentChatIdx, errorMessages);
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let currentChatIdx = activeChat;
    if (currentChatIdx === null) {
      const defaultChatName = `Chat ${chats.length + 1}`;
      setChats([defaultChatName, ...chats]);
      setMessagesStore([[], ...messagesStore]);
      currentChatIdx = 0;
      setActiveChat(0);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      const updatedMessages = [...(messagesStore[currentChatIdx] || []), { role: "user", text: `Uploaded file: ${file.name}` }];
      syncChatState(currentChatIdx, updatedMessages);
      console.log("File uploaded successfully:", data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex h-dvh md:h-screen w-full text-white bg-[#020617] overflow-hidden relative">
      
      {/* Background Dim Backdrop for mobile menu overlays */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      <LeftPanel
        chats={chats}
        setChats={setChats}
        messagesStore={messagesStore}
        setMessagesStore={setMessagesStore}
        setMessages={setMessages}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* MOBILE TOP NAVIGATION BAR */}
        <div className="w-full h-14 border-b border-cyan-400/10 flex items-center px-4 justify-between bg-slate-950/40 md:hidden z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 p-1 cursor-pointer">
            <Menu size={22} />
          </button>
          <span className="text-sm font-semibold text-cyan-400">
            {activeChat !== null ? chats[activeChat] : "Solved AI"}
          </span>
          <div className="w-6" />
        </div>

        {/* CHAT MESSAGES LAYER */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <span className="text-4xl mb-2">🤖</span>
              <p className="text-sm font-medium">No messages yet. Ask anything to start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] md:max-w-md text-sm leading-relaxed break-words ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-950/20" 
                    : "bg-slate-900/60 border border-cyan-400/10 text-gray-100"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* BOTTOM INPUT BAR */}
        <div className="p-3 md:p-4 border-t border-cyan-400/10 bg-slate-950/80 sticky bottom-0">
          <div className="flex gap-2 bg-black/50 p-2 rounded-xl border border-cyan-400/20 items-center max-w-4xl mx-auto w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none px-2 text-white text-sm"
            />

            <button
              type="button"
              onClick={() => alert("Voice input not implemented yet 😉")}
              className="p-2 text-base rounded-lg bg-slate-800 hover:bg-slate-700 text-white active:scale-95 transition cursor-pointer"
            >
              🎤
            </button>

            <label className="p-2 text-base rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer text-white active:scale-95 transition">
              📎
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              type="button"
              onClick={handleSend}
              disabled={loadingAI}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 active:scale-95 transition text-sm disabled:opacity-50 cursor-pointer"
            >
              {loadingAI ? "..." : "➤"}
            </button>
          </div>
        </div>
      </div>

      {/* Utilities to clean UI experience */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}