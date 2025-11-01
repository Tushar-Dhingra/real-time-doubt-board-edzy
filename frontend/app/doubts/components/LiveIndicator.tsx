'use client';

import { Users } from 'lucide-react';

interface LiveIndicatorProps {
  isConnected: boolean;
  userCount: number;
}

export const LiveIndicator = ({ isConnected, userCount }: LiveIndicatorProps) => {
  return (
    <div className="glass-effect rounded-2xl px-5 py-3 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
            {isConnected && (
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75"></div>
            )}
          </div>
          <span className={`text-sm font-bold ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
            {isConnected ? '🟢 Live' : '⚫ Offline'}
          </span>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 px-3 py-1.5 rounded-full">
          <Users className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-bold text-violet-700">{userCount}</span>
          <span className="text-xs text-violet-600 font-medium">online</span>
        </div>
      </div>
    </div>
  );
};
