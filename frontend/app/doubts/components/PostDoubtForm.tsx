'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface PostDoubtFormProps {
  onSubmit: (data: { title: string; description: string; subject: string; createdBy: string }) => void;
  isLoading: boolean;
}

const subjects = ['Maths', 'Science', 'English', 'Social Science'];

export const PostDoubtForm = ({ onSubmit, isLoading }: PostDoubtFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('Maths');
  const [createdBy, setCreatedBy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !createdBy) return;
    onSubmit({ title, description, subject, createdBy });
    setTitle('');
    setDescription('');
    setCreatedBy('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-6 md:p-8 card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xl">
          ❓
        </div>
        <h2 className="text-2xl font-bold">Ask a Question</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">Your Name</label>
          <input
            type="text"
            placeholder="e.g., John Doe"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white/50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">Question Title</label>
          <input
            type="text"
            placeholder="What's your question?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white/50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">Description</label>
          <textarea
            placeholder="Explain your doubt in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all bg-white/50"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white/50"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:pt-7">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              Post Question
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
