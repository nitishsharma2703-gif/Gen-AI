import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from "react";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  // ⏳ Loading state
  if (loading) {
    return (<main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-pink-500 text-white">
  
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
</main>)
  }

  // ❌ Not logged in → redirect
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  // ✅ Logged in → show protected content
  return children;
};

export default Protected;