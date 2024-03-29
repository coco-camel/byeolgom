import { instance } from './api';

export const signUp = async () => {
  try {
    const res = await instance.get('');
    return res;
  } catch (error) {
    throw new Error('');
  }
};
