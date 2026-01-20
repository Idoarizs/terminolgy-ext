// react
import React, { useEffect, useState } from "react";

// icons
import { Settings, LoaderCircleIcon } from "lucide-react";

// components
import {
  Card,
  InputField,
  SectionHeader,
  PreferencesModal,
  AIResponses,
} from "@/components/index";

// utils
import { buildPrompt } from "@/lib/utils";

function App() {
  const [openPreferences, setOpenPreferences] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (term: string) => {
    setUserInput("");
    setUserInput(term);
  };

  const onFetchAIResponse = async (term: string) => {
    setLoading(true);
    const apiKey = import.meta.env.WXT_OPENROUTER_API_KEY;

    try {
      const prompt = await buildPrompt(term);
      const payload = {
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      };

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      setAIResponse(aiMessage);
    } catch (error) {
      setAIResponse("Sorry, something went wrong while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInput) {
      onFetchAIResponse(userInput);
    }
  }, [userInput]);

  return (
    <div className="max-w-xs w-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg p-5 min-h-fit">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold">Learning Companion</h1>
          <p className="text-sm text-indigo-100">Personalized for you</p>
        </div>
        <button
          onClick={() => setOpenPreferences(true)}
          className="p-2 hover:bg-indigo-400 rounded-full transition cursor-pointer"
        >
          <Settings size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <Card>
          <SectionHeader
            title="I Want to Learn"
            subtitle="Add specific terms you'd like to learn more about"
            icon="book"
          />

          <InputField
            placeholder="Enter a term (e.g., 'Quantum Computing')"
            handleSubmit={onSubmit}
          />

          {!userInput && (
            <p className="text-xs text-red-300 mt-1 ml-1">
              Input cannot be empty.
            </p>
          )}
        </Card>

        {loading && (
          <Card>
            <div className="text-gray-500 flex flex-col gap-2 text-center">
              <LoaderCircleIcon className="animate-spin mx-auto text-indigo-500" />
              <span className="animate-pulse">Generating...</span>
            </div>
          </Card>
        )}

        {!loading && aiResponse && (
          <Card>
            <SectionHeader
              title="AI Explanation"
              subtitle="Here's a simplified explanation of your term"
              icon="bot"
            />
            <AIResponses response={aiResponse} />
          </Card>
        )}
      </div>

      {openPreferences && (
        <PreferencesModal onClose={() => setOpenPreferences(false)} />
      )}
    </div>
  );
}

export default App;
