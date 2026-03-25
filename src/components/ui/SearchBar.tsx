import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = '搜索目的地、关键词…' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-full border border-primary/20 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-gray-700 placeholder-gray-400 transition-all"
      />
    </div>
  );
}
