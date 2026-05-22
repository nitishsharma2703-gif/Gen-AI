import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Boy3D() {
  const navigate = useNavigate();

  /* ---------------- LOGIN CHECK (LAZY STATE) ---------------- */
  // Fix: useEffect ko hata kar initial state mein hi check kar liya taaki cascading renders na hon
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
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-black text-white flex flex-col justify-between">

      {/* ---------------- VIDEO BACKGROUND ---------------- */}
      <video
        src="/images/car.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* ---------------- HEADER (TOP BAR) ---------------- */}
      {/* Fix: Tailwind v4 ke mutabik bg-gradient-to-b ko bg-linear-to-b kiya hai */}
      <header className="relative w-full flex justify-between items-center p-4 md:p-6 z-20 bg-linear-to-b from-black/60 to-transparent">
        <div className="text-cyan-400 text-xs md:text-sm font-mono max-w-[50%] md:max-w-xs">
          <p className="truncate md:whitespace-normal">Solved AI is your AI chatbot...</p>
        </div>

        <div className="flex gap-2 md:gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition cursor-pointer"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <main className="relative flex-1 w-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-16 gap-8 md:gap-4 z-10 my-auto pb-24 md:pb-0">
        
        {/* LEFT TEXT (WELCOME) */}
        {/* Fix: Tailwind v4 ke mutabik bg-gradient-to-r ko bg-linear-to-r kiya hai */}
        <div className="text-center md:text-left space-y-2 max-w-md">
          <h1 className="text-xl md:text-4xl text-cyan-400 font-medium tracking-wide">Welcome to</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-200 to-cyan-400">
            Solved AI
          </h2>
          <p className="text-lg md:text-xl text-cyan-100/80 font-light">🤖 Easy & Fast Solution</p>
        </div>

        {/* RIGHT ANIMATED TEXT */}
        {/* Fix: Tailwind v4 ke mutabik max-w-[340px] ko max-w-85 kiya hai */}
        <div className="w-full max-w-85 space-y-3 md:space-y-4">

          <div className="animate-loop bg-white/5 border border-cyan-400/20 rounded-xl p-3 md:p-4 backdrop-blur-md">
            <p className="text-xs md:text-sm text-cyan-100/90 leading-relaxed">
              Solved AI, you can communicate and ask questions directly with a powerful AI system that helps you find information, answer questions, and even provide solutions to complex problems.
            </p>
          </div>

          <div className="animate-loop bg-white/5 border border-cyan-400/20 rounded-xl p-3 md:p-4 backdrop-blur-md" style={{ animationDelay: "2s" }}>
            <p className="text-xs md:text-sm text-cyan-100/90 leading-relaxed">
              Natural Chat: Chatbot AI uses advanced natural language technology to understand and respond to your questions and requests in a natural and intuitive way.
            </p>
          </div>

          <div className="animate-loop bg-white/5 border border-cyan-400/20 rounded-xl p-3 md:p-4 backdrop-blur-md" style={{ animationDelay: "4s" }}>
            <p className="text-xs md:text-sm text-cyan-100/90 leading-relaxed">
              Chatbot AI is an intelligent artificial intelligence interactive application that brings a unique and convenient experience to users.
            </p>
          </div>

          <div className="animate-loop bg-white/5 border border-cyan-400/20 rounded-xl p-3 md:p-4 backdrop-blur-md" style={{ animationDelay: "6s" }}>
            <p className="text-xs md:text-sm text-cyan-300 font-mono text-center md:text-left">
              Tip: Click “Start Chat” to begin...
            </p>
          </div>

        </div>
      </main>

      {/* ---------------- START BUTTON (FOOTER BAR) ---------------- */}
      <div className="fixed md:absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-auto px-4">
        <button
          onClick={handleStartChat}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-base md:text-lg font-semibold shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer"
        >
          🚀 Start Chat
        </button>
      </div>

      {/* ---------------- CENTER POPUP ---------------- */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          {/* Fix: Tailwind v4 ke mutabik max-w-[360px] ko max-w-90 kiya hai */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900/95 border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-90 text-center shadow-2xl animate-popup"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              🔐 Login Required
            </h2>

            <p className="text-sm text-gray-300 mb-6">
              Please login first to start chatting 💙
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
              >
                Go to Login
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ANIMATION STYLES ---------------- */}
      <style>{`
        @keyframes fadeLoop {
          0% { opacity: 0; transform: translateY(15px); }
          8% { opacity: 1; transform: translateY(0); }
          25% { opacity: 1; }
          33% { opacity: 0; transform: translateY(-15px); }
          100% { opacity: 0; }
        }

        .animate-loop {
          animation: fadeLoop 8s infinite;
          opacity: 0;
        }

        @keyframes popupScale {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-popup {
          animation: popupScale 0.2s ease-out;
        }
      `}</style>

    </div>
  );
}