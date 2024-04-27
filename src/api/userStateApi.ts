import { authInstance } from './api';

export const getUserState = async () => {
  try {
    const res = await authInstance.get('/getUser');
    return res.data;
  } catch (err) {
    throw new Error(``);
  }
};
