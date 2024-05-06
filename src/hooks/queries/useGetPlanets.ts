import { useQuery } from '@tanstack/react-query';
import { getPlanets } from '../../api/planetShopApi';

export const useGetPlanets = () => {
  return useQuery({
    queryKey: ['getPlanets'],
    queryFn: () => getPlanets(),
    staleTime: 1000 * 180,
    gcTime: 1000 * 300,
  });
};
