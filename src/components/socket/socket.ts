import { io } from 'socket.io-client';

export const socket = (roomid: string) => {
  const token = {
    Authorization: `${localStorage.getItem('accessToken')}`,
  };

  return io('localhost:3000' + `/chatlist/${roomid}`, {
    extraHeaders: { Authorization: `${token}` },
  });
};
