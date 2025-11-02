export interface PreferenceItem {
    label: string;
    options: string[];
    key: string;
    default: string;
}

export const preferencesData: PreferenceItem[] = [
    {
        label: "Learning Style",
        options: ["Visual (diagram)", "Auditory", "Reading/Writing", "Kinesthetic"],
        key: "style",
        default: "Visual (diagram)",
    },
    {
        label: "Explanation Depth",
        options: ["Basic", "Intermediate", "Advanced"],
        key: "depth",
        default: "Intermediate",
    },
    {
        label: "Learning Pace",
        options: ["Slow", "Moderate", "Fast"],
        key: "pace",
        default: "Moderate",
    },
    {
        label: "Content Format",
        options: ["Text", "Video", "Mixed Format"],
        key: "format",
        default: "Mixed Format",
    },
];
