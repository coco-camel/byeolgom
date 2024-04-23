import { useQuery } from '@tanstack/react-query';
import { getUserName } from '../../api/nickNameApi';
import { NickName } from '../../types/NickName.interface';

export const useFetchNickName = () => {
  return useQuery<NickName, Error>({
    queryKey: ['nickname'],
    queryFn: getUserName,
  });
};
