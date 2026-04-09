import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!username || !email || !password) {
      return alert("All fields are required");
    }

    try {
      console.log("Submitting form...");

      const res = await handleRegister({
        username,
        email,
        password,
      });

      console.log("REGISTER SUCCESS 👉", res);

      // ✅ success check
      if (res?.user) {
        alert("Account created successfully ✅");
        navigate("/login");
      }
    } catch (err) {
      console.error("Frontend Error:", err);

      // ✅ proper error message
      if (typeof err === "string") {
        alert(err);
      } else {
        alert("Registration failed ❌");
      }
    }
  };

  // ✅ Loading Screen
  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pinimg.com/originals/4b/06/e3/4b06e393fd0647c265b1282b0f006486.gif"
            alt="Loading"
            className="h-56 object-contain"
          />
          <h1 className="text-4xl mt-4 text-center animate-pulse text-cyan-400">
            Loading...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 relative">

      {/* Background glow */}
      <div className="absolute w-72 h-72 bg-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse top-2 left-2"></div>
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-2xl opacity-30 animate-pulse bottom-2 right-2"></div>

      {/* Container */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/40 overflow-hidden z-10">

        {/* Left */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-6 border-r border-cyan-500/30">
          <img
            src="https://assets-v2.lottiefiles.com/a/b942abb8-d62e-11ee-a179-af4105107ebe/tPZDd31PcO.gif"
            alt="register"
            className="h-48 object-contain animate-bounce"
          />
          <h2 className="text-cyan-400 text-lg mt-4 font-semibold">
            Solved AI 🚀
          </h2>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 p-6 text-white">
          <h2 className="text-2xl font-semibold text-center mb-6 text-cyan-400">
            Create Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="relative">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="Username"
                className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-cyan-500/30"
              />
              <label className="absolute left-4 top-1 text-xs text-cyan-300">
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
                className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 border border-cyan-500/30"
              />
              <label className="absolute left-4 top-1 text-xs text-cyan-300">
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
                className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-cyan-500/30"
              />
              <label className="absolute left-4 top-1 text-xs text-cyan-300">
                Password
              </label>

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm cursor-pointer text-cyan-300"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-5 text-cyan-300">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 font-semibold text-cyan-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
