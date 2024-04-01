import { ContentData } from '../types/ContentData.interface';
import { authInstance } from './api';

export const sendContent = async (contentData: ContentData) => {
  const { content, icon, userId } = contentData;

  try {
    const res = await authInstance.post('/worries', {
      content,
      icon,
      userId,
    });
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
