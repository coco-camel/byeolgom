import { useMutation } from '@tanstack/react-query';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import { deleteContent } from '../../api/sendContentApi';

export const useDeleteContentMutation = () => {
  const mutation = useMutation({
    mutationFn: (params: WorriesDetailParams) => deleteContent(params),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
