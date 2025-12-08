export interface PreferenceItem {
  label: string;
  options: string[];
  key: string;
  default: string;
}

export const preferencesData: PreferenceItem[] = [
  {
    label: "Learning Style",
    options: ["Concise", "Detailed", "Step-by-step", "Example-based"],
    key: "style",
    default: "Concise",
  },
  {
    label: "Explanation Depth",
    options: ["Basic", "Intermediate", "Advanced"],
    key: "depth",
    default: "Basic",
  },
  {
    label: "Learning Pace",
    options: ["Slow", "Moderate", "Fast"],
    key: "pace",
    default: "Slow",
  },
  {
    label: "Content Format",
    options: ["Text", "Table", "Mixed"],
    key: "format",
    default: "Mixed",
  },
  {
    label: "Language",
    options: ["English", "Indonesia"],
    key: "language",
    default: "Indonesia",
  },
];
