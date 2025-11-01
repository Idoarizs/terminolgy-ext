// react
import { useState, useEffect } from "react";

// shadcn components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// custom components
import { DropdownField } from "@/components/custom";

// dummy data
import { preferencesData } from "@/lib/dummy";

// utility functions
import { getPreferences, updatePreference } from "@/lib/utils";

export default function PreferencesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // store current preferences in state
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    if (open) {
      setPreferences(getPreferences("preferences"));
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl">
        {/* header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-b from-[#334F90] to-black bg-clip-text text-transparent">
            Pengaturan
          </DialogTitle>
          <DialogDescription className="text-black">
            Berikut pengaturan <b>preferensi belajar</b> kamu!
          </DialogDescription>
        </DialogHeader>

        {/* content */}
        <div className="flex flex-wrap gap-4 w-full">
          {preferencesData.map((pref) => (
            <DropdownField
              key={pref.label}
              label={pref.label}
              placeholder="Pilih"
              options={pref.options}
              value={preferences[pref.label] || ""}
              onChange={(val) => {
                updatePreference(pref.label, val, preferences, setPreferences);
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
