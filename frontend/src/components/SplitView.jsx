import { motion } from "framer-motion";
import Model3D from "./Model3D";
import Chat3D from "./chat";

export default function SplitView() {
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Split View - Left + Right */}
      <div className="flex h-full w-full">
        {/* Left Side - Model3D + Info */}
        <motion.div
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-1/4 h-full overflow-hidden border-r border-cyan-500/30 p-4 flex flex-col justify-between"
        >
          <div>
            
            <div className="w-full h-3/4 relative">
              <Model3D />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold">
              Login
            </button>
            <button className="w-full py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold">
              Logout
            </button>
          </div>
        </motion.div>

        {/* Right Side - Chat3D */}
        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-3/4 h-full overflow-hidden relative"
        >
          <Chat3D />
        </motion.div>
      </div>
    </div>
  );
}