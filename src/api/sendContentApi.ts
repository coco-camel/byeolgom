import { ContentData } from '../types/ContentData.interface';
import { authInstance } from './api';

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
