import React from "react";
import {Routes , Route} from "react-router";
import Login from "./routes/login";
import Register from "./routes/register";
import Protected from "./compounds/protected";


const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected><h1>Welcome to the App</h1></Protected>} />
      </Routes>
    </div>
  )
}

export default App
