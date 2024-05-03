import { useMutation } from '@tanstack/react-query';
import { sendContentReply } from '../../api/sendContentApi';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import { ContentData } from '../../types/ContentData.interface';

interface DataProps {
  params: WorriesDetailParams;
  contentData: ContentData;
}
export const useSendContentReplyMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ params, contentData }: DataProps) =>
      sendContentReply(params, contentData),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
