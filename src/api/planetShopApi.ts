import { authInstance } from './api';

export const getPlanets = async () => {
  try {
    const res = await authInstance.get(`/getPlanets`);
    return res.data.planetTypes;
  } catch (error) {
    throw new Error(``);
  }
};

export const changePlanet = async (planet: string) => {
  try {
    const res = await authInstance.put(`/changePlanet`, {
      newPlanetType: planet,
    });
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(``);
  }
};

export const buyPlanet = async (planet: string) => {
  try {
    const res = await authInstance.post(`/buyPlanet`, { planetType: planet });
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(``);
  }
};
