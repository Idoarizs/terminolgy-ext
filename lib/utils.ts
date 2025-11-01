import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// load preferences from localStorage when modal opens
export const getPreferences = (key: string) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
};

// save preferences to localStorage
export const savePreferences = (key: string, newPrefs: {}) => {
  localStorage.setItem(key, JSON.stringify(newPrefs));
};

// merge and update preferences in state & storage
export const updatePreference = (key: string, value: string, prefs: any, setPrefs: (prefs: any) => void) => {
  const updated = { ...prefs, [key]: value };
  setPrefs(updated);
  savePreferences("preferences", updated);
};