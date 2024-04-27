import { authInstance } from './api';

export const updateDarkMode = async (theme: boolean) => {
  try {
    const res = await authInstance.put('/updateDarkMode', { darkMode: theme });
    return res;
  } catch (err) {
    throw new Error(``);
  }
};
