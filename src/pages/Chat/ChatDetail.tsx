import { useState, useEffect, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';
import Back from '@/back.svg?react';

const socket = io('localhost:3000');

function ChatDetail() {
  const location = useLocation();
  const [chats, setChats] = useState<string[]>([]);
  const params = new URLSearchParams(location.search);
  const name = params.get('name') ?? '';
  const room = params.get('room') ?? '';

  useEffect(() => {
    socket.emit('join room', { name, room });

    socket.on('message', (message: string) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [name, room]);

  const sendMessage = (message: string) => {
    socket.emit('chatting', message);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const messageInput = target.elements.namedItem(
      'message',
    ) as HTMLInputElement;

    if (messageInput) {
      const message = messageInput.value.trim();

      if (message) {
        sendMessage(message);
        messageInput.value = '';
      }
    }
  };

  return (
    <>
      <ChatDetailHeader>
        <Back width={20} height={20} fill="#EEEEEE" />
        <PastContentButton>이전 대화확인</PastContentButton>
      </ChatDetailHeader>

      <ChatContainer>
        {chats.map((message, index) => (
          <ChatBubble key={index}>{message}</ChatBubble>
        ))}
      </ChatContainer>

      <ChatInputForm onSubmit={handleSendMessage}>
        <input type="text" name="message" placeholder="메시지 입력..." />
        <button type="submit">전송</button>
      </ChatInputForm>
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

const ChatContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 20px;
`;

const ChatBubble = styled.div`
  background-color: #f0f0f0;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const ChatInputForm = styled.form`
  margin-top: 20px;
  display: flex;
  input {
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 8px;
  }
  button {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }
`;
