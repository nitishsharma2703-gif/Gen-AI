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
  Image,
  Grid,
  Heart,
  Settings,
  HelpCircle,
  Compass,
  PlusSquare,
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

// ─── LEFT PANEL ─────────────────
function LeftPanel({
  chats,
  setChats,
  messagesStore,
  setMessagesStore,
  setMessages,
  activeChat,
  setActiveChat,
  onLogout,
}) {
  const [search, setSearch] = useState("");
  const filteredChats = chats.filter((chat) =>
    chat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-72 h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#06b6d420,transparent),radial-gradient(circle_at_80%_70%,#a855f720,transparent),#020617]" />
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 h-full flex flex-col justify-between bg-black/40 border-r border-cyan-400/10">
        <div className="p-3 space-y-3">
          <SideMenuItem
            icon={<PlusSquare size={18} />}
            text="New chat"
            onClick={() => {
              const newChatName = `Chat ${chats.length + 1}`;
              setChats([newChatName, ...chats]);
              setMessages([]);
              setActiveChat(0);
              setMessagesStore([[], ...messagesStore]);
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

          <SideMenuItem icon={<Image size={18} />} text="Images" />
          <SideMenuItem icon={<Grid size={18} />} text="Apps" />
          <SideMenuItem icon={<Compass size={18} />} text="Research" />
          <SideMenuItem icon={<Heart size={18} />} text="Health" />

          {filteredChats.map((chat, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveChat(i);
                setMessages(messagesStore[i] || []);
              }}
              className="flex justify-between px-3 py-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
            >
              <span className="truncate">{chat}</span>
              <Trash2
                size={14}
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

        <div className="p-3 space-y-2 border-t border-cyan-400/10">
          <SideMenuItem icon={<Settings size={18} />} text="Settings" />
          <SideMenuItem icon={<HelpCircle size={18} />} text="Help" />
          <div className="flex items-center gap-2 text-gray-300">
            <User size={18} /> Nitish
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg w-full"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────
export default function MergedPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [messagesStore, setMessagesStore] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const bottomRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const updated = [...messages, { role: "user", text: input }, { role: "bot", text: "Thinking..." }];
    setMessages(updated);
    setInput("");
    setLoadingAI(true);

    try {
      const res = await generateAI(input);
      const aiText = res?.data?.result || res?.data?.message || res?.result || res?.message || "No response";
      const final = [...updated.slice(0, -1), { role: "bot", text: aiText }];
      setMessages(final);
    } catch {
      setMessages([...updated.slice(0, -1), { role: "bot", text: "Error 😢" }]);
    } finally {
      setLoadingAI(false);
    }
  };

  // Scroll to bottom
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  // Store messages per chat
  useEffect(() => {
    if (activeChat !== null) {
      const updatedStore = [...messagesStore];
      updatedStore[activeChat] = messages;
      setMessagesStore(updatedStore);
    }
  }, [messages, activeChat]);

  // File upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessages([...messages, { role: "user", text: `Uploaded file: ${file.name}` }]);
      console.log("File uploaded:", data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex h-screen text-white">
      <LeftPanel
        chats={chats}
        setChats={setChats}
        messagesStore={messagesStore}
        setMessagesStore={setMessagesStore}
        setMessages={setMessages}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col bg-[#020617]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-3 rounded-2xl max-w-md ${msg.role === "user" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : "bg-black/40 border border-cyan-400/20"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT BAR */}
        <div className="p-4 border-t border-cyan-400/10">
          <div className="flex gap-2 bg-black/40 p-2 rounded-xl border border-cyan-400/20 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none px-2 text-white"
            />

            {/* Mic button */}
            <button
              onClick={() => alert("Voice input not implemented yet 😉")}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
            >
              🎤
            </button>

            {/* File upload button */}
            <label className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer text-white">
              📎
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 rounded-lg"
            >
              {loadingAI ? "..." : "➤"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}