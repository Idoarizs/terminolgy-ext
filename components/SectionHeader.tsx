// react
import React from "react";

// icons
import { BookOpen } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 text-gray-800 font-semibold text-base">
        <BookOpen size={18} className="text-indigo-500" />
        <span>{title}</span>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
