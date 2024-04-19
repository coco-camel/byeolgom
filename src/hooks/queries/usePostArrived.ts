import { useQuery } from '@tanstack/react-query';
import { postArrived } from '../../api/postArrivedApi';

export const usePostArrived = () => {
  return useQuery({
    queryKey: ['postArrived'],
    queryFn: postArrived,
    refetchInterval: 1000 * 20,
  });
};
