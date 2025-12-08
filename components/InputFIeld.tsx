// react
import React, { useState } from "react";

// icons
import { Plus } from "lucide-react";

interface InputFieldProps {
  placeholder?: string;
  handleSubmit: (term: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = "Enter a term...",
  handleSubmit,
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex justify-center gap-2 mt-3 text-black">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        disabled={!value.trim()}
        onClick={() => handleSubmit(value)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 cursor-pointer rounded-lg transition"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default InputField;
