import { useState } from "react";
import {
  Plus,
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
  PlusSquare
} from "lucide-react";

export default function Sidebar({
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

  const handleNewChat = () => {
    setMessages([]);
    setActiveChat(null);
  };

  const deleteChat = (index) => {
    const updatedChats = chats.filter((_, i) => i !== index);
    const updatedMessages = messagesStore.filter((_, i) => i !== index);

    setChats(updatedChats);
    setMessagesStore(updatedMessages);

    if (activeChat === index) {
      setMessages([]);
      setActiveChat(null);
    } else if (activeChat > index) {
      setActiveChat(activeChat - 1);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-72 bg-[#0d0d0d] border-r border-white/10 flex flex-col justify-between">

      {/* TOP */}
      <div className="p-3">

        {/* Logo */}
        <div className="w-6 h-6 bg-white rounded-full mb-6"></div>

        {/* Menu */}
        <div className="space-y-2 mb-4">
          <MenuItem icon={<PlusSquare size={18} />} text="New chat" onClick={handleNewChat} />
          
          <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-lg">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>

          <MenuItem icon={<Image size={18} />} text="Images" />
          <MenuItem icon={<Grid size={18} />} text="Apps" />
          <MenuItem icon={<Compass size={18} />} text="Deep research" />
          <MenuItem icon={<Heart size={18} />} text="Health" />
        </div>

        {/* CHAT LIST */}
        <div className="space-y-1 max-h-[300px] overflow-y-auto">
          {filteredChats.map((chat, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveChat(i);
                setMessages(messagesStore[i] || []);
              }}
              className={`group flex justify-between px-3 py-2 rounded-lg cursor-pointer ${
                activeChat === i ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <span className="truncate text-sm">{chat}</span>

              <Trash2
                size={14}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(i);
                }}
                className="opacity-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="p-3 border-t border-white/10 space-y-3">

        <MenuItem text="See plans and pricing" />
        <MenuItem icon={<Settings size={18} />} text="Settings" />
        <MenuItem icon={<HelpCircle size={18} />} text="Help" />

        <div className="flex items-center gap-2 mt-3">
          <User size={18} /> Nitish
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

const MenuItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer text-sm text-gray-300"
  >
    {icon}
    <span>{text}</span>
  </div>
);