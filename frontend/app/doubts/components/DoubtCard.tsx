'use client';

import { CheckCircle, MessageCircle, Clock } from 'lucide-react';
import { Doubt } from '@/utils/api';
import { ReplyBox } from './ReplyBox';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface DoubtCardProps {
  doubt: Doubt;
  onReply: (doubtId: string, message: string, repliedBy: string) => void;
  onResolve: (doubtId: string) => void;
  isLoading: boolean;
}

const subjectColors: Record<string, string> = {
  Maths: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
  Science: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  English: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  'Social Science': 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
};

const subjectEmojis: Record<string, string> = {
  Maths: '🔢',
  Science: '🔬',
  English: '📖',
  'Social Science': '🌍',
};

export const DoubtCard = ({ doubt, onReply, onResolve, isLoading }: DoubtCardProps) => {
  return (
    <div className={`glass-effect rounded-2xl p-6 card-hover ${doubt.resolved ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-md ${subjectColors[doubt.subject]} flex items-center gap-1.5`}>
              <span>{subjectEmojis[doubt.subject]}</span>
              {doubt.subject}
            </span>
            {doubt.resolved && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                Resolved
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{doubt.title}</h3>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{doubt.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white text-xs font-bold">
                {doubt.createdBy.charAt(0).toUpperCase()}
              </div>
              {doubt.createdBy}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDistanceToNow(doubt.createdAt)}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <MessageCircle className="w-3.5 h-3.5" />
              {doubt.replies.length} {doubt.replies.length === 1 ? 'reply' : 'replies'}
            </span>
          </div>
        </div>
        {!doubt.resolved && (
          <button
            onClick={() => onResolve(doubt.id)}
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 whitespace-nowrap"
          >
            ✔️ Resolve
          </button>
        )}
      </div>

      {doubt.replies.length > 0 && (
        <div className="mt-5 space-y-3 border-t-2 border-gray-100 pt-5">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Replies ({doubt.replies.length})
          </h4>
          {doubt.replies.map((reply, index) => (
            <div key={reply.id} className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                    {reply.repliedBy.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{reply.repliedBy}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(reply.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed ml-9">{reply.message}</p>
            </div>
          ))}
        </div>
      )}

      {!doubt.resolved && (
        <ReplyBox
          doubtId={doubt.id}
          onSubmit={(message, repliedBy) => onReply(doubt.id, message, repliedBy)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
