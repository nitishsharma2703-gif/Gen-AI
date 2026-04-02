import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

import cowsay from "cowsay";
console.log(
  cowsay.say({
    text: "I'm a moooodule",
    e: "oO",
    T: "U ",
  })
);

import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

connectToDB();

app.listen(4000, () => {
  console.log(`Server running on port 4000 🚀`);
});