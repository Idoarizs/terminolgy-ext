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

export const preferencesStorage = storage.defineItem<Preferences>("local:preferences", {
  defaultValue: Object.fromEntries(
    preferencesData.map((item) => [item.key, item.default])
  ),
});

export async function getPreferences(): Promise<Preferences> {
    return await preferencesStorage.getValue();
}

export async function savePreferences(preferences: Preferences): Promise<void> {
    await preferencesStorage.setValue(preferences);
}

export async function updatePreference(key: string, value: string): Promise<void> {
    const current = await preferencesStorage.getValue();
    await preferencesStorage.setValue({
        ...current,
        [key]: value,
    });
}
