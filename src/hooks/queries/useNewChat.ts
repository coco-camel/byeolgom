import { useQuery } from '@tanstack/react-query';
import { chatRoomList } from '../../api/chatRoomApi';

export const useNewChat = () => {
  return useQuery({
    queryKey: ['newChat'],
    queryFn: () => chatRoomList(1),
    refetchInterval: 1000 * 20,
  });
};
