import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_Token');
    const newSocket = io('https://friendj.store', {
      auth: {
        token: token,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
