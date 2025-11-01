// shadcn components
import { Button } from "@/components/ui/button";

// icons
import { generateIcon, settingsIcon } from "@/assets";

// animation
import { motion } from "framer-motion";

// variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const item = {
  hidden: { y: -20, opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: "blur(6px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

export default function FloatingAction({ onExplainClick, onSettingsClick }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex items-center gap-2"
    >
      <motion.div variants={item}>
        <Button
          className="rounded-full bg-white font-semibold shadow-md hover:bg-gray-100 border px-4 cursor-pointer"
          size="sm"
          onClick={onExplainClick}
        >
          <span className="flex items-center gap-2">
            <img src={generateIcon} alt="Generate Icon" className="w-4 h-4" />
            <span className="bg-gradient-to-b from-black to-[#334F90] bg-clip-text text-transparent">
              Jelaskan
            </span>
          </span>
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <button
          onClick={onSettingsClick}
          className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 border cursor-pointer"
        >
          <img src={settingsIcon} alt="Settings Icon" className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
