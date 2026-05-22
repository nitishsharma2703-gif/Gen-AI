import { useState } from "react"; // Fix: 'useEffect' unused tha, isliye usey hata diya gaya hai

export default function Model3D() {
  // Agar aapko rotation handle karni hai, to rotationY use karein warna in variables ko hata dein.
  // Agar use karna hai, to is tarah state bana kar use kijiye:
  const [rotationY, setRotationY] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  /* ---------------- CONSTANT BACKGROUND PARTICLES ---------------- */
  // Fix: Math.random() ko render se hatane ke liye hum component ke baahar ya render se pehle 
  // ek baar static positions generate kar lete hain taaki re-render par data change na ho.
  const [bgParticles] = useState(() => 
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      width: Math.random() * 100 + 50 + "px",
      height: Math.random() * 100 + 50 + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      duration: 5 + Math.random() * 10 + "s"
    }))
  );

  /* ---------------- FUNCTIONS (USED IN UI) ---------------- */
  // Fix: Jo functions unused error de rahe the, unhe unke respective buttons par link karein
  const handleNewChat = () => {
    console.log("New chat started");
  };

  const rotateLeft = () => {
    setRotationY((prev) => prev - 15);
  };

  const rotateRight = () => {
    setRotationY((prev) => prev + 15);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const handleAskAnything = (e) => {
    e.preventDefault();
    console.log("Asking anything...");
  };

  return (
    // Fix: bg-gradient-to-br ko bg-linear-to-br kiya gaya hai Tailwind v4 ke standard ke mutabik
    <div className={`relative w-full h-screen bg-linear-to-br from-slate-900 to-black overflow-hidden text-white ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      
      {/* ---------------- FLOATING PARTICLES (BACKGROUND) ---------------- */}
      {/* Fix: Ab Math.random() render block ke andar direct call nahi ho raha */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bgParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-cyan-400 rounded-full opacity-20"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              animation: `float ${particle.duration}s infinite`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* ---------------- 3D MODEL VIEWPORT CONTROLS ---------------- */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
        
        {/* Dummy 3D Container (Aapke original model placement ke liye) */}
        <div 
          className="w-64 h-64 bg-slate-800 rounded-2xl flex items-center justify-center border border-cyan-500/30 transition-transform duration-300"
          style={{ transform: `rotateY(${rotationY}deg)` }}
        >
          <span className="text-cyan-400 font-mono">3D Model Space ({rotationY}°)</span>
        </div>

        {/* CONTROLS (Ab saare functions yahan click handler par lag gaye hain to error nahi aayega) */}
        <div className="flex gap-4">
          <button onClick={rotateLeft} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer">
            Rotate Left
          </button>
          <button onClick={rotateRight} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer">
            Rotate Right
          </button>
          <button onClick={toggleFullScreen} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg cursor-pointer">
            {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        {/* CHAT INTERACTION CONTROLS */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button onClick={handleNewChat} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer">
            New Chat
          </button>
          
          <form onSubmit={handleAskAnything} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ask anything..." 
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-cyan-400 text-sm"
            />
            <button type="submit" className="px-3 py-2 bg-cyan-500 rounded-lg text-sm cursor-pointer">
              Send
            </button>
          </form>
        </div>

      </div>

      {/* CSS Floating Effect for Background Particles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}