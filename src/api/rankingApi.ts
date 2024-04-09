// import { authInstance } from './api';
import axios from 'axios';

export const fetchRankings = async () => {
  try {
    const res = await axios.get('https://friendj.store/top-likes');
    console.log(res);
    return res.data;
  } catch (err) {
    console.log('err', err);
  }
};
