// react
import { useEffect, useState } from "react";

// shadcn components
import { Spinner } from "@/components/ui/shadcn-io/spinner/index";

// icons
import { X } from "lucide-react";

// animation
import { AnimatePresence, motion } from "framer-motion";

// axios instance
import apiClient from "@/lib/axios";

// utility functions
import { getPreferences } from "@/lib/utils";

// google gen ai
import { GoogleGenAI } from "@google/genai";

export default function AIResponseSidebar({ open, onClose, label }) {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async (userInput) => {
    setLoading(true);
    setAiResponse("");

    try {
      const preferences = getPreferences("preferences");
      const prompt = `Jelaskan "${userInput}" dengan preferensi berikut:\n\n${
        preferences ? JSON.stringify(preferences, null, 2) : "None"
      }`;

      // using gpt-oss-20b:free model
      // const payload = {
      //   model: "openai/gpt-oss-20b:free",
      //   messages: [{ role: "user", content: prompt }],
      // };

      // const res = await apiClient.post("/chat/completions", payload);
      // const content =
      //   res.data?.choices?.[0]?.message?.content || "No response.";

      // setAiResponse(content);

      // using gemini-2.5-flash model
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.WXT_GEMINI_API_KEY,
      });
      const payload = {
        model: "gemini-2.5-flash",
        contents: prompt,
      };

      const res = await ai.models.generateContent(payload);
      const content = res.candidates[0].content?.parts[0]?.text || "No response.";
      setAiResponse(content);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setAiResponse("Unable to fetch AI response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && label) {
      fetchAIResponse(label);
    }
  }, [open, label]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ai-sidebar"
          initial={{ scale: 0.8, opacity: 0, y: -30, filter: "blur(6px)" }}
          animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ scale: 0.8, opacity: 0, y: -30, filter: "blur(6px)" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="fixed top-20 right-6 w-96 h-50vh max-h-[70vh] rounded-2xl px-4 py-8 shadow-2xl 
            border border-white/10 bg-white/5 backdrop-blur-sm z-[9999] flex flex-col text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full p-1.5 hover:bg-white/10 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3">
              <Spinner variant="ring" />
              <span className="font-medium">Loading...</span>
            </div>
          ) : (
            <div className="mt-6 overflow-y-auto text-sm whitespace-pre-wrap prose max-h-[55vh]">
              {aiResponse}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
