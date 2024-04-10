import { authInstance } from './api';

export const getStarCount = async () => {
  try {
    const res = await authInstance.get(`/count`);
    return res.data;
  } catch (error) {
    throw new Error(``);
  }
};

export const getWorryCount = async () => {
  try {
    const res = await authInstance.get(`/worries/remaining-worries`);
    console.log(res.data.remainingWorries);
    return res.data.remainingWorries;
  } catch (error) {
    throw new Error(``);
  }
};
