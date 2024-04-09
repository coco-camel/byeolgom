import { authInstance } from './api';
import { WorriesDetailParams } from '../types/WorriesDetailParams.interface';

export const postArrived = async () => {
  try {
    const res = await authInstance.get(`/comments`);
    return res.data;
  } catch (error) {
    throw new Error(``);
  }
};

export const getWorryDetail = async (params: WorriesDetailParams) => {
  try {
    const res = await authInstance.get(`/worries/${params.worryid}`);
    return res.data;
  } catch (error) {
    throw new Error(``);
  }
};

export const getCommentDetail = async (params: WorriesDetailParams) => {
  try {
    const res = await authInstance.get(`/comments/${params.commentid}`);
    return res.data;
  } catch (error) {
    throw new Error(``);
  }
};
