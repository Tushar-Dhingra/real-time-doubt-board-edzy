import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doubtsApi, Doubt } from '@/utils/api';
import { toast } from 'sonner';

export const useDoubts = () => {
  const queryClient = useQueryClient();

  const { data: doubts = [], isLoading } = useQuery({
    queryKey: ['doubts'],
    queryFn: async () => {
      const { data } = await doubtsApi.getAll();
      return data;
    },
  });

  const createDoubt = useMutation({
    mutationFn: doubtsApi.create,
    onError: (error: any) => {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        toast.error(error.response?.data?.error || 'Failed to post doubt');
      }
    },
    retry: false,
  });

  const addReply = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { message: string; repliedBy: string } }) =>
      doubtsApi.addReply(id, data),
    onError: (error: any) => {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        toast.error(error.response?.data?.error || 'Failed to add reply');
      }
    },
    retry: false,
  });

  const resolveDoubt = useMutation({
    mutationFn: doubtsApi.resolve,
    onError: (error: any) => {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        toast.error(error.response?.data?.error || 'Failed to resolve doubt');
      }
    },
    retry: false,
  });

  const updateDoubtInCache = (doubt: Doubt) => {
    queryClient.setQueryData(['doubts'], (old: Doubt[] = []) => {
      const index = old.findIndex(d => d.id === doubt.id);
      if (index >= 0) {
        const newDoubts = [...old];
        newDoubts[index] = doubt;
        return newDoubts;
      }
      return [doubt, ...old];
    });
  };

  return {
    doubts,
    isLoading,
    createDoubt,
    addReply,
    resolveDoubt,
    updateDoubtInCache,
  };
};
