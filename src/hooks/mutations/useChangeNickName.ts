import { useMutation } from '@tanstack/react-query';
import { changeUserName } from '../../api/nickName';

export const useChangeNicknameMutation = () => {
  const mutation = useMutation<string, Error, string>({
    mutationFn: changeUserName,
    onSuccess: (data) => {
      console.log('Nickname changed successfully:', data);
    },
    onError: (error: Error) => {
      console.error('Error changing nickname:', error.message);
    },
  });

  return mutation;
};
