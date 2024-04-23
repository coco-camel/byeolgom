import { useQuery } from '@tanstack/react-query';
import { getWorryCount } from '../../api/countApi';

export const useWorryCount = () => {
  return useQuery({
    queryKey: ['worryCount'],
    queryFn: getWorryCount,
    refetchInterval: 1000 * 20,
  });
};
