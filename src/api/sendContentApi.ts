import { ContentData } from '../types/ContentData.interface';
import { authInstance } from './api';
import { WorriesDetailParams } from '../types/WorriesDetailParams.interface';

export const sendContent = async (contentData: ContentData) => {
  const { content, icon, fontColor } = contentData;

  try {
    const res = await authInstance.post('/worries', {
      content,
      icon,
      fontColor,
    });
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const sendContentReply = async (
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

export const sendStarReply = async (
  params: WorriesDetailParams,
  contentData: ContentData,
) => {
  const { content, fontColor } = contentData;

  try {
    const res = await authInstance.post(
      `/worries/${params.worryid}/comments/${params.commentid}/sendLike`,
      {
        content,
        fontColor,
      },
    );
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const createChat = async (createChatData: ContentData) => {
  const { worryId, userId, commentAuthorId } = createChatData;

  try {
    const res = await authInstance.post('/createChatRoom', {
      worryId,
      userId,
      commentAuthorId,
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

export const reportContent = async (
  params: WorriesDetailParams,
  reportReason: string,
) => {
  try {
    const res = await authInstance.post(
      `/worries/${params.worryid}/comments/${params.commentid ? params.commentid + '/' : ''}report`,
      {
        reportReason,
      },
    );
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
