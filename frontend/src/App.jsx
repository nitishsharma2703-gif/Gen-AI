import React from "react";
import {Routes , Route} from "react-router";
import Login from "./routes/login";
import Register from "./routes/register";
import Protected from "./compounds/protected";
import SplitView from "./components/SplitView";
import Hero3D from "./routes/hero3D";
import BoyTest from "./routes/boytest";


// Home page now uses SplitView with animations

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/s" element={<Protected><h1>Welcome to the App</h1></Protected>} />
        <Route path="/" element={<Hero3D />} />
        
        <Route path="/boytest" element={<BoyTest />} />
      </Routes>
    </div>
  )
}

export default App
