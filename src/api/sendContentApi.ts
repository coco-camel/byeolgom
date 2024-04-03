import { ContentData } from '../types/ContentData.interface';
import { authInstance } from './api';
import { WorriesDetailParams } from '../types/WorriesDetailParams.interface';

export const sendContent = async (contentData: ContentData) => {
  const { content, icon, userId, fontColor } = contentData;

  try {
    const res = await authInstance.post('/worries', {
      content,
      icon,
      userId,
      fontColor,
    });
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const checkContent = async (params: WorriesDetailParams) => {
  try {
    const res = await authInstance.get(`/worries/${params.worryid}`);
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const sendReply = async (
  params: WorriesDetailParams,
  contentData: ContentData,
) => {
  const { content, userId, fontColor } = contentData;

  try {
    let postAddress = `/worries/${params.worryid}/comments`;
    if (params.commentid) {
      postAddress += `/${params.commentid}`;
    }

    const res = await authInstance.post(postAddress, {
      content,
      userId,
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
