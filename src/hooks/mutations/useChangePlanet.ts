import { useMutation } from '@tanstack/react-query';
import { changePlanet } from '../../api/planetShopApi';

export const useChangePlanetMutation = () => {
  const mutation = useMutation({
    mutationFn: (planet: string) => changePlanet(planet),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
