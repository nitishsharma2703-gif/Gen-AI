import { useState } from "react";
import { useNavigate } from "react-router-dom";// used for render page
import { useAuth } from "../hooks/useAuth";


export default function Login() {
  const { loading, handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  // ✅ Fixed loading screen
  if (loading) {
    return (
      // <main className="flex items-center justify-center  min-h-screen bg-gradient-to-br from-black to-pink-500 px-2 text-white">
        
      //   <h1 className="text-5xl ">Loading...</h1>
      //   <img src="https://i.pinimg.com/originals/4b/06/e3/4b06e393fd0647c265b1282b0f006486.gif" alt="Loading" />
       
      // </main>
<main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-pink-500 text-white">
  
  {/* Content Wrapper */}
  <div className="flex flex-col items-center">
    
    {/* Image */}
    <img
      src="https://i.pinimg.com/originals/4b/06/e3/4b06e393fd0647c265b1282b0f006486.gif"
      alt="Loading"
      className="h-56 sm:h-84 object-contain"
    />

    {/* Text just above image */}
    <h1 className="text-4xl sm:text-5xl mt-4 text-center animate-pulse">
      Loading...
    </h1>

  </div>
</main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-pink-500 px-2 sm:px-4 overflow-hidden relative">
      
      {/* Background */}
      <div className="absolute w-24 h-24 sm:w-72 sm:h-72 bg-pink-400 rounded-full blur-2xl opacity-30 animate-pulse top-2 left-2"></div>
      <div className="absolute w-24 h-24 sm:w-72 sm:h-72 bg-purple-400 rounded-full blur-2xl opacity-30 animate-pulse bottom-2 right-2"></div>

      {/* Robot */}
      <div className="robot-container absolute bottom-6 left-0">
        <img
          src="https://media.tenor.com/lbZlFPWWXQ8AAAAj/robot-walking.gif"
          alt="robot"
          className="robot-img h-48"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-8 text-white z-10">
        
        <h2 className="text-lg sm:text-2xl font-semibold text-center mb-5 sm:mb-6">
          Welcome Back 💓
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
            />
            <label className="absolute left-3 sm:left-4 top-1 text-xs sm:text-sm text-gray-200 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-1 peer-focus:text-xs">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            />
            <label className="absolute left-3 sm:left-4 top-1 text-xs sm:text-sm text-gray-200 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-1 peer-focus:text-xs">
              Password
            </label>

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 sm:right-3 top-2 sm:top-3 text-xs sm:text-sm cursor-pointer text-gray-200 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full py-2.5 sm:py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-yellow-300 transition transform hover:scale-105 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-center mt-4 sm:mt-5 text-gray-200">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="ml-1 font-semibold text-white hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          .robot-container {
            animation: moveAcross 8s linear infinite;
          }

          @keyframes moveAcross {
            0% { transform: translateX(0); }
            50% { transform: translateX(90vw); }
            51% { transform: translateX(90vw) scaleX(-1); }
            100% { transform: translateX(0) scaleX(-1); }
          }

          .robot-img {
            animation: walkBounce 0.4s ease-in-out infinite alternate;
          }

          @keyframes walkBounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-6px); }
          }
        `}
      </style>
    </div>
  );
}