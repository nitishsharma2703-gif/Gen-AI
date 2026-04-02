import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import cowsay from "cowsay"


console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './compounds/authContext.jsx';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>

   <AuthProvider>
    <App />
    </AuthProvider>
    
 </BrowserRouter>
)