import { PastContent } from '../types/PastContent.interface';
import { WorriesDetailParams } from '../types/WorriesDetailParams.interface';
import { authInstance } from './api';

export const myWorries = async (page: number) => {
  try {
    const res = await authInstance.get('/mySolvedWorry/1', {
      params: {
        page,
        limit: 10,
      },
    });
    console.log(page);
    console.log('mm');
    console.log(res.data.worries);
    return res.data.worries;
  } catch (error) {
    throw new Error('');
  }
};

export const yourWorries = async (page: number) => {
  try {
    const res = await authInstance.get('/myHelpedSolvedWorry/1', {
      params: {
        page,
        limit: 10,
      },
    });
    console.log(page);
    console.log('yy');
    console.log(res.data.worries);
    return res.data.worries;
  } catch (error) {
    throw new Error('');
  }
};

export const worriesDetail = async (params: WorriesDetailParams) => {
  try {
    const res = await authInstance.get<PastContent>(
      `/${params.whosecontent}/${params.worryid}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
