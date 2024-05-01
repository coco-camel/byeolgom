import { authInstance } from './api';

export const chatRoomList = async (page: number) => {
  try {
    const res = await authInstance.get(`/chatRooms`, {
      params: {
        page,
        limit: 10,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
