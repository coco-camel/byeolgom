import { useQuery } from '@tanstack/react-query';
import { getStarCount } from '../../api/countApi';

export const useStarCount = () => {
  return useQuery({
    queryKey: ['starCount'],
    queryFn: getStarCount,
    refetchInterval: 1000 * 20,
  });
};
