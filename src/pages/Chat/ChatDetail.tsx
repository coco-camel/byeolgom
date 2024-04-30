import { useState, useEffect } from 'react';
import useSocket from '../../components/socket/useSocket';
import styled from 'styled-components';
import Back from '@/back.svg?react';

function ChatDetail() {
  const [messages, setMessages] = useState<string[]>([]);
  const [roomJoined, setRoomJoined] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>('');

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('chatting', (data) => {
      console.log('메시지 수신:', data);
      setMessages((prevMessages) => [...prevMessages, data.msg]);
    });

    socket.on('room message', (message) => {
      console.log(message);
      setRoomJoined(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && messageInput.trim() !== '') {
      socket.emit('chatting', { msg: messageInput });
      setMessages((prevMessages) => [...prevMessages, messageInput]);
      setMessageInput('');
    }
  };

  return (
    <>
      <ChatDetailHeader>
        <Back width={20} height={20} fill="#EEEEEE" />
        <PastContentButton>이전 대화확인</PastContentButton>
      </ChatDetailHeader>

      <ChatContainer>
        {roomJoined && <p>방에 입장하였습니다.</p>}
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </ChatContainer>

      <InputContainer>
        <ChatInput
          type="text"
          placeholder="메시지 입력"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </InputContainer>
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;
`;
