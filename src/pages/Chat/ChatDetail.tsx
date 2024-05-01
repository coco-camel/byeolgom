import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { useChatInfoStore } from '../../store/chatInfoStore';
import styled from 'styled-components';
import Back from '@/back.svg?react';

interface Message {
  userId: number;
  text: string;
  roomId: number;
  time: string;
}

function ChatDetail() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomJoined, setRoomJoined] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>('');

  const navigate = useNavigate();
  const { roomId, worryId, isSolved } = useChatInfoStore();

  const targetPath = isSolved
    ? `/pastcontents/mySolvedWorry/${worryId}`
    : `/pastcontents/myHelpedSolvedWorry/${worryId}`;

  useEffect(() => {
    const token = localStorage.getItem('access_Token');
    const newSocket = io('https://friendj.store', {
      auth: {
        token: token,
      },
    });

    setSocket(newSocket);
    newSocket.emit('join room', { roomId });

    newSocket.on('chatting', (data) => {
      const { userId, text, roomId, time } = data;
      const newMessage = {
        userId,
        text,
        roomId,
        time,
      };
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

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
      setMessageInput('');
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <>
      <ChatDetailHeader>
        <Back
          width={20}
          height={20}
          fill="#EEEEEE"
          style={{ cursor: 'pointer' }}
          onClick={handleBackNavigation}
        />
        <Link to={targetPath}>
          <PastContentButton>이전 대화확인</PastContentButton>
        </Link>
      </ChatDetailHeader>

      <ChatroomContainer>
        <ChatContainer>
          {roomJoined && <p>방에 입장하였습니다.</p>}
          {messages.map((message, index) => (
            <div key={index}>{message.text}</div>
          ))}
        </ChatContainer>

        <InputContainer>
          <ChatInput
            type="text"
            placeholder="내용을 입력해주세요"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <SendButton onClick={sendMessage}>전송</SendButton>
        </InputContainer>
      </ChatroomContainer>
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

const ChatroomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 88%;
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
  height: 90%;
  padding: 20px;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ChatInput = styled.input`
  width: 70%;
  height: 46px;
  padding: 10px;
  font-size: 12px;
  border-radius: 15px;
`;

const SendButton = styled.button`
  width: 60px;
  height: 46px;
  padding: 10px;
  font-size: 12px;
  border-radius: 25px;
  background-color: #2f4768;
  color: #eee;
  border: none;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: #253954;
  }
`;
