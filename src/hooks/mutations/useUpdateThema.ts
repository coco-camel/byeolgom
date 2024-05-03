import { useMutation } from '@tanstack/react-query';
import { updateDarkMode } from '../../api/themeApi';

export const useUpdateThemaMutation = () => {
  const mutation = useMutation({
    mutationFn: (thema: boolean) => updateDarkMode(thema),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
