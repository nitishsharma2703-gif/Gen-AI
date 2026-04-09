import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Boy3D() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /* ---------------- LOGIN CHECK ---------------- */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

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
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* ---------------- VIDEO BACKGROUND ---------------- */}
      <video
        src="/images/car.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* ---------------- TOP RIGHT BUTTONS ---------------- */}
      <div className="absolute top-6 right-6 flex gap-3 z-20">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        )}
      </div>

      {/* ---------------- TOP RIGHT TEXT ---------------- */}
      <div className="absolute mt-12 top-8 right-8 text-cyan-400 text-sm font-mono z-10">
        <p>Solved AI is your AI chatbot for everyday use...</p>
      </div>

      {/* ---------------- LEFT TEXT ---------------- */}
      <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-white z-10">
        <h1 className="text-2xl md:text-4xl text-cyan-400">Welcome</h1>
        <h2 className="text-4xl md:text-6xl font-bold">Solved AI</h2>
        <p className="text-xl mt-2">🤖 Easy & Fast Solution</p>
      </div>

      {/* ---------------- RIGHT ANIMATED TEXT ---------------- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-6 w-[90vw] max-w-[320px] space-y-4 z-10">

        <div className="animate-loop bg-white/10 border border-cyan-400/40 rounded-xl p-4 backdrop-blur">
          <p className="text-sm text-cyan-100">
          Solved AI, you can communicate and ask questions directly with a powerful AI system that helps you find information, answer questions, and even provide solutions to complex problems
          </p>
        </div>

        <div className="animate-loop bg-white/10 border border-cyan-400/40 rounded-xl p-4 backdrop-blur" style={{ animationDelay: "2s" }}>
          <p className="text-sm text-cyan-100">
          Natural Chat: Chatbot AI uses advanced natural language technology to understand and respond to your questions and requests in a natural and intuitive way.
          </p>
        </div>

        <div className="animate-loop bg-white/10 border border-cyan-400/40 rounded-xl p-4 backdrop-blur" style={{ animationDelay: "4s" }}>
          <p className="text-sm text-cyan-100">
          Chatbot AI is an intelligent artificial intelligence interactive application that brings a unique and convenient experience to users. .
          </p>
        </div>

        <div className="animate-loop bg-white/10 border border-cyan-400/40 rounded-xl p-4 backdrop-blur" style={{ animationDelay: "6s" }}>
          <p className="text-sm text-cyan-100">
            Tip: Click “Start Chat” to begin...
          </p>
        </div>

      </div>

      {/* ---------------- START BUTTON ---------------- */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleStartChat}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:scale-110 transition"
        >
          🚀 Start Chat
        </button>
      </div>

      {/* ---------------- CENTER POPUP ---------------- */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black/90 border border-white/10 rounded-2xl p-8 w-[90%] max-w-[400px] text-center shadow-2xl animate-popup"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              🔐 Login Required
            </h2>

            <p className="text-gray-300 mb-6">
              Please login first to start chatting 💙
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg"
              >
                Go to Login
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ANIMATION ---------------- */}
      <style>{`
        @keyframes fadeLoop {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          25% { opacity: 1; }
          35% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 0; }
        }

        .animate-loop {
          animation: fadeLoop 8s infinite;
          opacity: 0;
        }

        @keyframes popupScale {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-popup {
          animation: popupScale 0.3s ease-out;
        }
      `}</style>

    </div>
  );
}