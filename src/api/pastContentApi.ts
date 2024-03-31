import { PastContent } from '../types/PastContent.interface';
import { WorriesDetailParams } from '../types/WorriesDetailParams.interface';
import { authInstance } from './api';

export const myWorries = async () => {
  try {
    const res = await authInstance.get('/mySolvedWorry', {
      // 로그인 구현 후 header에 token으로 처리
      params: { userid: 1 },
    });
    console.log('me');
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const yourWorries = async () => {
  try {
    const res = await authInstance.get('/myHelpedSolvedWorry', {
      // 로그인 구현 후 header에 token으로 처리
      params: { commentAuthorId: 1 },
    });
    console.log('you');
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const worriesDetail = async (params: WorriesDetailParams) => {
  try {
    const res = await authInstance.get<PastContent>(
      `/${params.whosecontent}/${params.worryid}`,
      {
        params: { userid: 1 },
      },
    );
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
