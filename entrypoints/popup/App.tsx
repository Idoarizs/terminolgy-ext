// react
import React, { useState } from "react";

// icons
import { Settings } from "lucide-react";

// components
import { Card, InputField, SectionHeader, PreferencesModal } from "@/components/index";

function App() {
  const [openPreferences, setOpenPreferences] = useState(false);

  const onSubmit = (term: string) => {
    alert("Added term:" + term);
  };

  return (
    <div className="max-w-lg w-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-xs font-semibold">Learning Companion</h1>
          <p className="text-sm text-indigo-100">Personalized for you</p>
        </div>
        <button
          onClick={() => setOpenPreferences(true)}
          className="p-2 hover:bg-indigo-400 rounded-full transition"
        >
          <Settings size={18} />
        </button>
      </div>

      <Card>
        <SectionHeader
          title="Unknown Terminology"
          subtitle="Add words or concepts you'd like to learn more about"
        />
        <InputField
          placeholder="Enter a term (e.g., 'Quantum Computing')"
          handleSubmit={onSubmit}
        />
      </Card>

      {openPreferences && (
        <PreferencesModal onClose={() => setOpenPreferences(false)} />
      )}
    </div>
  );
}

export default App;