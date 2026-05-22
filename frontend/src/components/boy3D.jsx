import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Boy3D() {
  const navigate = useNavigate();

  /* ---------------- LOGIN CHECK (LAZY STATE) ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return !!user;
    }
    return false;
  });

  const [showPopup, setShowPopup] = useState(false);

  /* ---------------- START CHAT ---------------- */
  const handleStartChat = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }
    navigate("/boytest");
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    // h-dvh se mobile browser address bar layout ko crash nahi karega
    <div className="relative w-full h-dvh md:h-screen overflow-hidden bg-black text-white flex flex-col justify-between select-none">

      {/* ---------------- VIDEO BACKGROUND (FIXED FOR MOBILE) ---------------- */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          src="/images/car.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover will-change-transform scale-100"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* ---------------- HEADER (TOP BAR) ---------------- */}
      <header className="relative w-full flex justify-between items-center p-4 md:p-6 z-20 bg-linear-to-b from-black/90 to-transparent">
        <div className="text-cyan-400 text-xs md:text-sm font-mono max-w-[55%] truncate">
          <span>Solved AI is your assistant</span>
        </div>

        <div className="flex gap-2">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition active:scale-95 cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition active:scale-95 cursor-pointer"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-red-500/90 hover:bg-red-600 text-white transition active:scale-95 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* ---------------- MAIN CONTENT AREA (MOBILE OPTIMIZED SCROLL) ---------------- */}
      <main className="relative flex-1 w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-16 gap-6 z-10 overflow-y-auto pt-4 pb-28 md:py-0 no-scrollbar">
        
        {/* LEFT TEXT (WELCOME) */}
        <div className="text-center md:text-left space-y-1 md:space-y-2 mt-4 md:mt-0 w-full md:w-auto">
          <h1 className="text-lg md:text-4xl text-cyan-400 font-medium tracking-wide">Welcome to</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-100 to-cyan-400">
            Solved AI
          </h2>
          <p className="text-sm md:text-xl text-cyan-200/80 font-light">🤖 Easy & Fast Solution</p>
        </div>

        {/* RIGHT ANIMATED TEXT PANELS */}
        <div className="w-full max-w-sm space-y-3 px-1">

          <div className="animate-loop bg-slate-950/40 border border-cyan-500/20 rounded-xl p-3.5 backdrop-blur-md shadow-lg shadow-cyan-950/10">
            <p className="text-xs md:text-sm text-cyan-50/90 leading-relaxed">
              Solved AI, you can communicate and ask questions directly with a powerful AI system that helps you find information, answer questions, and provide solutions.
            </p>
          </div>

          <div className="animate-loop bg-slate-950/40 border border-cyan-500/20 rounded-xl p-3.5 backdrop-blur-md shadow-lg shadow-cyan-950/10" style={{ animationDelay: "2.5s" }}>
            <p className="text-xs md:text-sm text-cyan-50/90 leading-relaxed">
              Natural Chat: Chatbot AI uses advanced natural language technology to understand and respond to your requests in a natural, fluid and intuitive way.
            </p>
          </div>

          <div className="animate-loop bg-slate-950/40 border border-cyan-500/20 rounded-xl p-3.5 backdrop-blur-md shadow-lg shadow-cyan-950/10" style={{ animationDelay: "5s" }}>
            <p className="text-xs md:text-sm text-cyan-50/90 leading-relaxed">
              Chatbot AI is an intelligent artificial intelligence interactive application that brings a unique and convenient experience to modern users.
            </p>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-2.5 backdrop-blur-sm">
            <p className="text-[11px] md:text-xs text-cyan-300 font-mono text-center">
              💡 Tip: Click “Start Chat” button below to begin...
            </p>
          </div>

        </div>
      </main>

      {/* ---------------- START BUTTON (STICKY FOOTER HUB) ---------------- */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-linear-to-t from-black via-black/80 to-transparent pt-8 pb-6 text-center pointer-events-none">
        <div className="inline-block pointer-events-auto">
          <button
            onClick={handleStartChat}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3.5 rounded-full text-base font-bold shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition duration-200 whitespace-nowrap cursor-pointer tracking-wide"
          >
            🚀 Start Chat
          </button>
        </div>
      </div>

      {/* ---------------- CENTER POPUP ---------------- */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl animate-popup"
          >
            <h2 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              🔐 Login Required
            </h2>

            <p className="text-xs md:text-sm text-gray-300 mb-6 leading-normal">
              Please login first to access the AI chat assistance system 💙
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                Go to Login
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-white/5 hover:bg-white/10 text-gray-400 text-xs py-2 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ANIMATION & CUSTOM SCROLL UTILITIES ---------------- */}
      <style>{`
        @keyframes fadeLoop {
          0% { opacity: 0; transform: translateY(10px); }
          5% { opacity: 1; transform: translateY(0); }
          30% { opacity: 1; }
          35% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 0; }
        }

        .animate-loop {
          animation: fadeLoop 7.5s infinite;
          opacity: 0;
        }

        @keyframes popupScale {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-popup {
          animation: popupScale 0.15s ease-out;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

    </div>
  );
}