export interface PreferenceItem {
  label: string;
  options: string[];
  key: string;
  default: string;
}

export const preferencesData: PreferenceItem[] = [
  {
    label: "Gaya Belajar", // → Set the Scene
    options: ["Visual", "Auditori", "Membaca/Menulis", "Kinestetik"],
    key: "style",
    default: "Visual",
  },
  {
    label: "Kedalaman Penjelasan", // → Be Specific
    options: ["Dasar", "Menengah", "Lanjutan"],
    key: "depth",
    default: "Menengah",
  },
  {
    label: "Kecepatan Belajar", // → Simplify Your Language
    options: ["Lambat", "Sedang", "Cepat"],
    key: "pace",
    default: "Sedang",
  },
  {
    label: "Format Konten", // → Structure the Output
    options: ["Teks", "Tabel", "Campuran"],
    key: "format",
    default: "Campuran",
  },
  {
    label: "Bahasa", // → Simplify Your Language (linguistic)
    options: ["Bahasa Indonesia", "Bahasa Inggris"],
    key: "language",
    default: "Bahasa Indonesia",
  },
];
