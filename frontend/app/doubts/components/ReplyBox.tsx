'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface ReplyBoxProps {
  doubtId: string;
  onSubmit: (message: string, repliedBy: string) => void;
  isLoading: boolean;
}

export const ReplyBox = ({ doubtId, onSubmit, isLoading }: ReplyBoxProps) => {
  const [message, setMessage] = useState('');
  const [repliedBy, setRepliedBy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !repliedBy) return;
    onSubmit(message, repliedBy);
    setMessage('');
    setRepliedBy('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-xs font-semibold text-gray-600">Add your reply</span>
      </div>
      <input
        type="text"
        placeholder="Your name"
        value={repliedBy}
        onChange={(e) => setRepliedBy(e.target.value)}
        className="w-full px-4 py-2.5 text-sm border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
        required
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a helpful reply..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 font-semibold"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
