import { authInstance } from './api';

export const fetchRankings = async () => {
  try {
    const res = await authInstance.get('https://friendj.store/top-likes');
    return res.data;
  } catch (err) {
    console.log('err', err);
  }
};
