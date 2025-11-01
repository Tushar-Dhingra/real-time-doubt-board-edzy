'use client';

import { useEffect, useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSocket } from './hooks/useSocket';
import { useDoubts } from './hooks/useDoubts';
import { PostDoubtForm } from './components/PostDoubtForm';
import { DoubtCard } from './components/DoubtCard';
import { LiveIndicator } from './components/LiveIndicator';
import { FilterBar } from './components/FilterBar';
import { Doubt } from '@/utils/api';

const queryClient = new QueryClient();

function DoubtsPageContent() {
  const { socket, isConnected, userCount } = useSocket();
  const { doubts, isLoading, createDoubt, addReply, resolveDoubt, updateDoubtInCache } = useDoubts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('doubt:created', (doubt: Doubt) => {
      updateDoubtInCache(doubt);
    });

    socket.on('doubt:replied', (doubt: Doubt) => {
      updateDoubtInCache(doubt);
    });

    socket.on('doubt:resolved', (doubt: Doubt) => {
      updateDoubtInCache(doubt);
    });

    return () => {
      socket.off('doubt:created');
      socket.off('doubt:replied');
      socket.off('doubt:resolved');
    };
  }, [socket, updateDoubtInCache]);

  const filteredDoubts = useMemo(() => {
    return doubts.filter((doubt) => {
      const matchesSearch =
        doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doubt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const cleanSubject = selectedSubject.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, '').trim();
      const matchesSubject = selectedSubject === 'All' || doubt.subject === cleanSubject;
      const matchesResolved = showResolved || !doubt.resolved;
      return matchesSearch && matchesSubject && matchesResolved;
    });
  }, [doubts, searchQuery, selectedSubject, showResolved]);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Doubt Board</h1>
            <p className="text-muted-foreground">Ask questions, get answers, learn together 🚀</p>
          </div>
          <LiveIndicator isConnected={isConnected} userCount={userCount} />
        </div>

        {/* Post Form */}
        <div className="mb-8 animate-fade-in">
          <PostDoubtForm
            onSubmit={(data) => createDoubt.mutate(data)}
            isLoading={createDoubt.isPending}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 animate-fade-in">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            showResolved={showResolved}
            setShowResolved={setShowResolved}
          />
        </div>

        {/* Doubts Feed */}
        {isLoading ? (
          <div className="glass-effect rounded-2xl p-12 text-center animate-pulse">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-medium">Loading doubts...</p>
          </div>
        ) : filteredDoubts.length === 0 ? (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold mb-2">No doubts found</h3>
            <p className="text-muted-foreground">Be the first to ask a question!</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredDoubts.map((doubt, index) => (
              <div key={doubt.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <DoubtCard
                  doubt={doubt}
                  onReply={(id, message, repliedBy) => addReply.mutate({ id, data: { message, repliedBy } })}
                  onResolve={(id) => resolveDoubt.mutate(id)}
                  isLoading={addReply.isPending || resolveDoubt.isPending}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DoubtsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DoubtsPageContent />
    </QueryClientProvider>
  );
}
