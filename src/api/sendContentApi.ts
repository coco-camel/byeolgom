import { ContentData } from '../types/ContentData.interface';
import { authInstance } from './api';
import { WorriesDetailParams } from '../types/WorriesDetailParams.interface';

export const sendContent = async (contentData: ContentData) => {
  const { content, icon, fontColor } = contentData;

  const accessToken = localStorage.getItem('access_Token');
  const userId = accessToken
    ? JSON.parse(atob(accessToken.split('.')[1])).userId
    : null;

  try {
    const res = await authInstance.post('/worries', {
      content,
      icon,
      fontColor,
      userId: userId,
    });
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const sendReply = async (
  params: WorriesDetailParams,
  contentData: ContentData,
) => {
  const { content, fontColor } = contentData;

  try {
    let postAddress = `/worries/${params.worryid}/comments`;
    if (params.commentid) {
      postAddress += `/${params.commentid}`;
    }

    const res = await authInstance.post(postAddress, {
      content,
      fontColor,
    });
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const deleteContent = async (params: WorriesDetailParams) => {
  try {
    const res = await authInstance.delete(`/worries/${params.worryid}`);
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
