// data
import { preferencesData } from "@/lib/data";

// wxt storage
import { storage } from "@wxt-dev/storage";

export interface PreferenceItem {
  label: string;
  options: string[];
  key: string;
  default: string;
}

export interface Preferences {
  [key: string]: string;
}

export const preferencesStorage = storage.defineItem<Preferences>(
  "local:preferences",
  {
    defaultValue: Object.fromEntries(
      preferencesData.map((item) => [item.key, item.default])
    ),
  }
);

export async function getPreferences(): Promise<Preferences> {
  return await preferencesStorage.getValue();
}

export async function savePreferences(preferences: Preferences): Promise<void> {
  await preferencesStorage.setValue(preferences);
}

export async function updatePreference(
  key: string,
  value: string
): Promise<void> {
  const current = await preferencesStorage.getValue();
  await preferencesStorage.setValue({
    ...current,
    [key]: value,
  });
}

export async function buildPrompt(term: string): Promise<string> {
  const preferences = await getPreferences();

  const style = preferences.style || "Visual";
  const depth = preferences.depth || "Menengah";
  const pace = preferences.pace || "Sedang";
  const format = preferences.format || "Campuran";
  const language = preferences.language || "Bahasa Indonesia";

  const styleDesc =
    style === "Visual"
      ? "Gunakan penjelasan berbasis visual seperti ilustrasi dan imajinasi ruang."
      : style === "Auditori"
      ? "Gunakan gaya naratif seperti bercerita atau dialog sederhana."
      : style === "Membaca/Menulis"
      ? "Gunakan format teks terstruktur dengan daftar dan ringkasan."
      : "Gunakan pendekatan praktikal melalui contoh nyata dan pengalaman langsung.";

  const depthDesc =
    depth === "Dasar"
      ? "Fokus pada definisi inti dan satu contoh sederhana yang mudah dipahami."
      : depth === "Menengah"
      ? "Berikan konteks tambahan, contoh penerapan, dan hubungan sebab-akibat."
      : "Tambahkan analisis mendalam serta perbandingan antar konsep.";

  const paceDesc =
    pace === "Lambat"
      ? "Jelaskan secara bertahap dengan pengulangan agar mudah dipahami."
      : pace === "Sedang"
      ? "Gunakan tempo penjelasan seimbang antara kejelasan dan kecepatan."
      : "Gunakan gaya cepat dan padat informasi, namun tetap mudah dimengerti.";

  const formatDesc =
    format === "Teks"
      ? "Gunakan format teks dengan poin-poin yang jelas."
      : format === "Tabel"
      ? "Gunakan format tabel untuk ringkasan atau perbandingan konsep."
      : "Gunakan kombinasi teks, tabel, dan emoji agar lebih menarik.";

  const langInstruction =
    language === "Bahasa Indonesia"
      ? "Gunakan Bahasa Indonesia yang sederhana dan komunikatif."
      : "Use English with clear and concise academic tone.";

  const prompt = `
  Kamu adalah asisten pembelajaran adaptif dengan penjelasan yang dipersonalisasi.
  
  # 1️⃣ SET THE SCENE (Gaya Belajar)
  Gaya belajar pengguna: **${style}**
  ${styleDesc}
  
  # 2️⃣ BE SPECIFIC (Kedalaman Penjelasan)
  Tingkat kedalaman: **${depth}**
  ${depthDesc}
  
  # 3️⃣ SIMPLIFY YOUR LANGUAGE (Bahasa & Kecepatan)
  Bahasa: **${language}**
  Kecepatan: **${pace}**
  ${paceDesc}
  ${langInstruction}
  
  # 4️⃣ STRUCTURE THE OUTPUT (Format Konten)
  Format yang diinginkan: **${format}**
  ${formatDesc}
  
  Jelaskan istilah berikut **${term}** sebagai **  terminologi akademik** jika relevan.
  `;

  return prompt.trim();
}
