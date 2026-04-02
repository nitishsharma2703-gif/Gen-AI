


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function Register() {

   const navigate = useNavigate();
   const [username , setUsername] = useState("");
   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
    const {loading, handleRegister} = useAuth();
    
const handleSubmit = async (e) => {
  e.preventDefault();
  await handleRegister({ username, email, password });
  navigate("/");
};
    // ✅ Fixed loading screen
    if (loading) {
      return (
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black  to-pink-500 px-2 sm:px-4 overflow-hidden">
      
      {/* Background */}
      <div className="absolute w-24 h-24 sm:w-72 sm:h-72 bg-pink-400 rounded-full blur-2xl opacity-30 animate-pulse top-2 left-2"></div>
      <div className="absolute w-24 h-24 sm:w-72 sm:h-72 bg-black    rounded-full blur-2xl opacity-30 animate-pulse bottom-2 right-2"></div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl bg-red    /10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Left Side (Image - controlled by height) */}
        <div className="image-box hidden md:flex md:w-1/2 flex-col justify-center items-center p-4 sm:p-6 bg-white/5">
          <img
            src="https://assets-v2.lottiefiles.com/a/b942abb8-d62e-11ee-a179-af4105107ebe/tPZDd31PcO.gif"
            alt="register"
            className="h-28 sm:h-36 md:h-48 lg:h-64 w-auto object-contain animate-bounce"
          />
          <h2 className="text-white text-lg mt-4 font-semibold text-center">
            Solved AI 🚀
          </h2>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 text-white">
          
          <h2 className="text-lg sm:text-2xl font-semibold text-center mb-5 sm:mb-6">
            Create Account ✨
          </h2>

          <form 
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5">

            {/* Username */}
            <div className="relative">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="Username"
                className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
              />
              <label className="absolute left-3 sm:left-4 top-1 text-xs sm:text-sm text-gray-200 transition-all 
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
                peer-focus:top-1 peer-focus:text-xs">
                Username
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                
                type="email"
                required
                placeholder="Email"
                className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
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
              className="w-full py-2.5 sm:py-3 rounded-lg bg-white text-gray-800 font-semibold 
              hover:bg-yellow-300 transition transform hover:scale-105 text-sm sm:text-base"
            >
              Register
            </button>

          </form>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-center mt-4 sm:mt-5 text-gray-200">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 font-semibold text-white hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>

      {/* 🔥 Height-based CSS */}
      <style>
        {`
          @media (max-height: 411px) {
            .image-box {
              display: none !important;
            }
          }

          @media (min-height: 412px) {
            .image-box {
              display: flex !important;
            }
          }
        `}
      </style>
    </div>
  );
}
