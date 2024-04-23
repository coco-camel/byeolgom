import { authInstance } from './api';

export const getStarCount = async () => {
  try {
    const res = await authInstance.get(`/count`);
    return res.data.remainingStars;
  } catch (error) {
    throw new Error(``);
  }
};

export const getWorryCount = async () => {
  try {
    const res = await authInstance.get(`/worries/remaining-worries`);
    return res.data.remainingWorries;
  } catch (error) {
    throw new Error(``);
  }
};
