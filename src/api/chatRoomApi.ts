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

export const chatRoomMessage = async (
  page: number,
  params: {
    roomid: number;
  },
) => {
  try {
    const res = await authInstance.get(`/rooms/${params.roomid}`, {
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

export const chatAccept = async (params: { roomid: number }) => {
  try {
    const res = await authInstance.put(`/acceptChat/${params.roomid}`);
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};

export const chatReject = async (params: { roomid: number }) => {
  try {
    const res = await authInstance.delete(`/rejectChat/${params.roomid}`);
    return res.data;
  } catch (error) {
    throw new Error('');
  }
};
