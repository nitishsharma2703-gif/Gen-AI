import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Boy3D() {
  const navigate = useNavigate();

  /* ---------------- FAST LOGIN CHECK (LAZY STATE INITIALIZER) ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return !!user;
    }
    return false;
  });

  const [showPopup, setShowPopup] = useState(false);

  /* ---------------- START CHAT CONTROLLER ---------------- */
  const handleStartChat = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }
    navigate("/boytest");
  };

  /* ---------------- INSTANT LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="relative w-full h-dvh md:h-screen overflow-hidden bg-black text-white flex flex-col justify-between">

      {/* ---------------- FIXED BACKDROP VIDEO LAYER (BRIGHT & CRISP) ---------------- */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          src="/images/car.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover" 
        />
        {/* Dark overlay ko poora hata diya hai taaki video original brightness mein chamke */}
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* ---------------- TOP GLOBAL HEADER ---------------- */}
      <header className="relative w-full flex justify-between items-center p-4 md:p-6 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="text-cyan-300 text-xs md:text-sm font-mono max-w-[50%] truncate md:whitespace-normal [text-shadow:1px_1px_4px_rgba(0,0,0,0.8)]">
          <p>Solved AI is your AI chatbot...</p>
        </div>

        <div className="flex gap-2">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-black/40 hover:bg-black/60 border border-white/30 text-white backdrop-blur-xs transition active:scale-95 cursor-pointer shadow-lg"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition active:scale-95 cursor-pointer shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* ---------------- MAIN MOBILE-RESPONSIVE FLOW CONTROLLER ---------------- */}
      <main className="relative flex-1 w-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-16 gap-8 z-10 overflow-y-auto no-scrollbar pb-28 md:pb-0">
        
        {/* LEFT BRAND SECTION */}
        <div className="text-center md:text-left space-y-1 w-full md:w-auto [text-shadow:2px_2px_8px_rgba(0,0,0,0.9)]">
          <h1 className="text-lg md:text-4xl text-cyan-400 font-semibold tracking-wide">Welcome to</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
            Solved AI
          </h2>
          <p className="text-sm md:text-xl text-white font-medium mt-1">🤖 Easy & Fast Solution</p>
        </div>

        {/* RIGHT CAROUSEL ANIMATION AREA */}
        <div className="w-full max-w-[340px] space-y-3 relative h-36 md:h-48">

          {/* Backgrounds ko thoda zyada glassmorphic kar diya hai taaki piche ki bright video par bhi text clear padha jaye */}
          <div className="animate-loop absolute inset-x-0 bg-slate-950/60 border border-cyan-400/30 rounded-xl p-4 backdrop-blur-md shadow-2xl">
            <p className="text-xs md:text-sm text-white font-medium leading-relaxed">
              With Solved AI, you can communicate and ask questions directly with a powerful AI system that helps you find information and provide solutions to complex problems.
            </p>
          </div>

          <div className="animate-loop absolute inset-x-0 bg-slate-950/60 border border-cyan-400/30 rounded-xl p-4 backdrop-blur-md shadow-2xl" style={{ animationDelay: "2s" }}>
            <p className="text-xs md:text-sm text-white font-medium leading-relaxed">
              Natural Chat: Chatbot AI uses advanced natural language technology to understand and respond to your questions and requests in a natural and intuitive way.
            </p>
          </div>

          <div className="animate-loop absolute inset-x-0 bg-slate-950/60 border border-cyan-400/30 rounded-xl p-4 backdrop-blur-md shadow-2xl" style={{ animationDelay: "4s" }}>
            <p className="text-xs md:text-sm text-white font-medium leading-relaxed">
              Chatbot AI is an intelligent artificial intelligence interactive application that brings a unique and convenient experience to users.
            </p>
          </div>

          <div className="animate-loop absolute inset-x-0 bg-cyan-950/80 border border-cyan-400/50 rounded-xl p-3 backdrop-blur-md shadow-2xl" style={{ animationDelay: "6s" }}>
            <p className="text-xs text-cyan-300 font-bold font-mono text-center">
              💡 Tip: Click “Start Chat” below to begin...
            </p>
          </div>

        </div>
      </main>

      {/* ---------------- FIXED BOTTOM ACTION BAR ---------------- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-auto">
        <button
          onClick={handleStartChat}
          className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3.5 rounded-full text-base font-bold shadow-xl shadow-black/50 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer tracking-wide"
        >
          🚀 Start Chat
        </button>
      </div>

      {/* ---------------- LOGIN AUTH REQUIRED POPUP ---------------- */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-950 border border-white/10 rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl animate-popup"
          >
            <h2 className="text-xl font-bold text-white mb-2">
              🔐 Login Required
            </h2>

            <p className="text-xs text-gray-300 mb-5">
              Please login first to start chatting 💙
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium py-2.5 rounded-lg transition cursor-pointer shadow-md"
              >
                Go to Login
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-white/5 hover:bg-white/10 text-gray-400 text-xs py-2 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CLEAN SCROLLBARS & SMOOTH KEYFRAMES ---------------- */}
      <style>{`
        @keyframes fadeLoop {
          0% { opacity: 0; transform: translateY(15px); }
          5% { opacity: 1; transform: translateY(0); }
          25% { opacity: 1; }
          30% { opacity: 0; transform: translateY(-15px); }
          100% { opacity: 0; }
        }

        .animate-loop {
          animation: fadeLoop 8s infinite;
          opacity: 0;
        }

        @keyframes popupScale {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-popup {
          animation: popupScale 0.15s ease-out;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}