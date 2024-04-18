import { useQuery } from '@tanstack/react-query';
import { getUserName } from '../../api/nickName';
import { NickName } from '../../types/NickName.interface';

export const useFetchNickName = () => {
  return useQuery<NickName, Error>({
    queryKey: ['nickname'],
    queryFn: getUserName,
  });
};
