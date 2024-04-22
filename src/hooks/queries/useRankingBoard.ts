import { useQuery } from '@tanstack/react-query';
import { fetchRankings } from '../../api/rankingApi';

interface ApiResponse {
  commentAuthorId?: number;
  likes: number;
  userId?: number;
  rank?: number;
  nickname?: string;
}

export const useRankingBoard = (isOpen: boolean) => {
  return useQuery<ApiResponse[], Error>({
    queryKey: ['rankings'],
    queryFn: fetchRankings,
    enabled: isOpen,
    staleTime: 20 * 1000,
  });
};
