import { useMutation } from '@tanstack/react-query';
import { buyPlanet } from '../../api/planetShopApi';

export const useBuyPlanetMutation = () => {
  const mutation = useMutation({
    mutationFn: (planet: string) => buyPlanet(planet),
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
