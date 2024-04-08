import { authInstance } from './api';

export const postArrived = async () => {
  try {
    const res = await authInstance.get(`/comments`);
    return res.data;
  } catch (error) {
    throw new Error(``);
  }
};
