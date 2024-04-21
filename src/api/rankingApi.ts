import { authInstance } from './api';

export const fetchRankings = async () => {
  try {
    const res = await authInstance.get('/top-likes');
    console.log('랭킹정보 =', res.data);
    return res.data;
  } catch (err) {
    console.error('err', err);
  }
};
