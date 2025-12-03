// src/components/LanguageTabs.tsx
import { Globe } from 'lucide-react';

type Language = 'en' | 'ar';

interface LanguageTabsProps {
  activeTab: Language;
  onTabChange: (lang: Language) => void;
}

const TABS = [
  { id: 'en' as Language, label: 'English', colorClass: 'text-blue-600 border-blue-600' },
  { id: 'ar' as Language, label: 'العربية', colorClass: 'text-green-600 border-green-600' },
];

export const LanguageTabs = ({ activeTab, onTabChange }: LanguageTabsProps) => {
  return (
    <div className="flex gap-2 mb-6 border-b">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
            activeTab === tab.id
              ? `${tab.colorClass} border-b-2`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Globe size={18} /> {tab.label}
        </button>
      ))}
    </div>
  );
};