// react
import React from "react";

interface DropdownProps {
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
    return (
        <div className="flex flex-col gap-1 text-black">
            <span className="text-sm text-gray-600 font-medium">{label}</span>
            <select
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
                {options.map((opt) => (
                    <option key={opt} className="text-black">{opt}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
