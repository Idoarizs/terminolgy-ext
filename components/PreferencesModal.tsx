// react
import React, { useEffect, useState } from "react";

// icons
import { Sliders } from "lucide-react";

// components
import { Card, Dropdown } from "@/components/index";

// data
import { preferencesData } from "@/lib/data";

// utils
import {
    getPreferences,
    updatePreference,
    Preferences,
} from "@/lib/utils";

interface PreferencesModalProps {
    onClose: () => void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ onClose }) => {
    const [values, setValues] = useState<Preferences | null>(null);

    useEffect(() => {
        const loadPreferences = async () => {
            const prefs = await getPreferences();
            setValues(prefs);
            console.log("Loaded preferences:", prefs);
        };
        loadPreferences();
    }, []);

    const handleChange = (key: string, val: string) => {
        if (!values) return;
        const updated = { ...values, [key]: val };
        setValues(updated);

        console.log(`Preference updated: ${key} → ${val}`);
        updatePreference(key, val);
    };

    if (!values) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <Card className="w-[380px] p-6 text-center text-gray-500 text-sm">
                    Loading preferences...
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <Card className="w-[380px] relative p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Sliders className="text-indigo-500" size={18} />
                        <h2 className="font-semibold text-gray-800 text-base">
                            Learning Preferences
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition text-sm"
                        aria-label="Close preferences modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {preferencesData.map((item) => (
                        <Dropdown
                            key={item.key}
                            label={item.label}
                            options={item.options}
                            value={values[item.key]}
                            onChange={(val) => handleChange(item.key, val)}
                        />
                    ))}
                </div>

                <div className="mt-4 p-2 border-t border-gray-200 text-xs text-gray-600">
                    <p className="font-semibold mb-1">Current Values:</p>
                    <pre className="bg-gray-100 p-2 rounded text-[11px] overflow-x-auto">
                        {JSON.stringify(values, null, 2)}
                    </pre>
                </div>
            </Card>
        </div>
    );
};

export default PreferencesModal;
