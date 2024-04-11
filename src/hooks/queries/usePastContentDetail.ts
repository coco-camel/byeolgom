import { useQuery } from '@tanstack/react-query';
import { worriesDetail } from '../../api/pastContentApi';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';

export const usePastContentDetail = (params: WorriesDetailParams) => {
  return useQuery({
    queryKey: ['pastContentDetail', params],
    queryFn: () => worriesDetail(params),
    staleTime: 1000 * 60,
    gcTime: 1000 * 120,
  });
};
