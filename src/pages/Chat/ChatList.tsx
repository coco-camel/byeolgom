import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';

function ChatList() {
  const joinRoom = (roomId: string) => {
    const socket = io('http://localhost:3000');
    socket.emit('join room', roomId);
  };

  return (
    <>
      <PageHeader>
        <p>채팅</p>
      </PageHeader>

      <Link to="/chatroom">
        <button onClick={() => joinRoom('chat_room')}>방 입장</button>
      </Link>
    </>
  );
}

export default ChatList;

const PageHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 16px;
    font-weight: 300;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;
