import { useEffect } from 'react';
import styled from 'styled-components';
import Back from '@/back.svg?react';
import { socket } from '../../components/socket/socket';
import type { Socket } from 'socket.io-client';

const socketInstances: Record<string, Socket> = {};

function ChatDetail() {
  useEffect(() => {
    if (!socketInstances[id]) {
      socketInstances[id] = socket(`${id}`);
    }
  });

  return (
    <>
      <ChatDetailHeader>
        <Back width={20} height={20} fill="#EEEEEE" />
        <PastContentButton>이전 대화확인</PastContentButton>
      </ChatDetailHeader>
    </>
  );
}

export default ChatDetail;

const ChatDetailHeader = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  justify-content: space-between;
`;

const PastContentButton = styled.button`
  width: 86px;
  height: 27px;
  border-radius: 100px;
  background-color: #eeeeee;
  font-size: 12px;
  &:hover {
    color: #ffffff;
    background-color: #e88439;
  }
`;
