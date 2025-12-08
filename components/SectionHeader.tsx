// react
import React from "react";

// icons
import { BookOpen, BotMessageSquareIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon: "book" | "bot";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 text-gray-800 font-semibold text-base">
        {icon === "book" ? (
          <BookOpen className="w-5 h-5 text-gray-600" />
        ) : (
          <BotMessageSquareIcon className="w-5 h-5 text-gray-600" />
        )}
        <span>{title}</span>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
