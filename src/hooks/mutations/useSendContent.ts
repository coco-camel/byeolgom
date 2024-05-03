import { useMutation } from '@tanstack/react-query';
import { sendContent } from '../../api/sendContentApi';

interface DataProps {
  content: string;
  icon: string;
  fontColor: string;
}

export const useSendContentMutation = () => {
  const mutation = useMutation({
    mutationFn: (contentData: DataProps) => sendContent(contentData),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
