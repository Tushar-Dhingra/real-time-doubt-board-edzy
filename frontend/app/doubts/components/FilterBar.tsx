'use client';

import { Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  showResolved: boolean;
  setShowResolved: (show: boolean) => void;
}

const subjects = ['All', '🔢 Maths', '🔬 Science', '📖 English', '🌍 Social Science'];

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedSubject,
  setSelectedSubject,
  showResolved,
  setShowResolved,
}: FilterBarProps) => {
  return (
    <div className="glass-effect rounded-2xl p-4 md:p-5">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white/50 font-medium"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white/50 font-medium min-w-[180px]"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject === 'All' ? '🌐 All Subjects' : `${subject}`}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2.5 px-5 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-violet-50 transition-all bg-white/50 font-medium">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
            className="w-4 h-4 accent-violet-600"
          />
          <span className="text-sm whitespace-nowrap">✔️ Show Resolved</span>
        </label>
      </div>
    </div>
  );
};
