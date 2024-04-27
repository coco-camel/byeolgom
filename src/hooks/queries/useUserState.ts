import { useQuery } from '@tanstack/react-query';
import { getUserState } from '../../api/userStateApi';

export const useUserState = () => {
  return useQuery({
    queryKey: ['userState'],
    queryFn: getUserState,
    staleTime: 1000 * 600,
    gcTime: 1000 * 600,
  });
};
