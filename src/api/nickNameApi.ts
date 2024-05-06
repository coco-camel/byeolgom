import { authInstance } from './api';
import { NickName } from '../types/NickName.interface';

export const getUserName = async (): Promise<NickName> => {
  try {
    const res = await authInstance.get('/myNickname');
    if (res.data && res.data.nickname) {
      return res.data as NickName;
    }
    throw new Error('닉네임을 찾을 수 없습니다');
  } catch (err) {
    console.error('err', err);
    throw err;
  }
};

export const changeUserName = async (nickname: string): Promise<string> => {
  if (nickname.length > 15) {
    throw new Error('닉네임은 15글자 미만이어야 합니다.');
  }

  const response = await authInstance.put('/nickname', { nickname });
  console.log(response);
  return response.data.message;
};
