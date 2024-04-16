import { authInstance } from './api';

export const getUserName = async () => {
  try {
    const res = await authInstance.get('/myNickname');
    return res.data;
  } catch (err) {
    console.log('err', err);
  }
};

export const changeUserName = async (nickname: string): Promise<string> => {
  if (nickname.length > 15) {
    throw new Error('닉네임은 15글자 미만이어야 합니다.');
  }

  const response = await authInstance.put('/nickname', { nickname });
  return response.data.message;
};
