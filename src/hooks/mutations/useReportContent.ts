import { useMutation } from '@tanstack/react-query';
import { reportContent } from '../../api/sendContentApi';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';

interface DataProps {
  params: WorriesDetailParams;
  reportReason: string;
}

export const useReportContentMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ params, reportReason }: DataProps) =>
      reportContent(params, reportReason),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
