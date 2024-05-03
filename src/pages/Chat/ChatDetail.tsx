import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import Loading from '../../components/loading/Loading';
import _ from 'lodash';
import { useChatInfoStore } from '../../store/chatInfoStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '../../hooks/observer/useObserver';
import { chatRoomMessage, chatAccept, chatReject } from '../../api/chatRoomApi';
import { ChatMessage } from '../../types/ChatMessage.interface';
import { useStateModalStore } from '../../store/stateModalStore';
import { useChatListStore } from '../../store/chatListStore';
import { formatTime } from '../../utills/formatDate/formatTime';
import useUserInfo from '../../utills/userInfo/userInfo';
import Back from '@/back.svg?react';
import {
  ChatDetailHeader,
  ChatroomContainer,
  PastContentButton,
  ChatContainer,
  InputContainer,
  ChatInput,
  SendButton,
  AcceptedContainer,
  BorderBox,
  AcceptedButton,
  LoadMoreDiv,
  NoneText,
  PastContentNone,
  MessageContainer,
  MessageBubble,
  MessageWrapper,
  MyMessageWrapper,
  TimeText,
} from './ChatStyle';

function ChatDetail() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef(null);

  const [socket, setSocket] = useState<Socket>();
  const [messageInput, setMessageInput] = useState<string>('');
  const [socketMessage, setSocketMessage] = useState<ChatMessage[]>([]);

  const navigate = useNavigate();
  const { roomId, worryId, commentAuthorId, isOwner, isAccepted } =
    useChatInfoStore();
  const { openStateModal } = useStateModalStore();
  const userId = useUserInfo();
  const { setChatAccepted, setChatDelete } = useChatListStore();

  // 이전 내역 이동 코드
  const targetPath = isOwner
    ? `/pastcontents/mySolvedWorry/${worryId}`
    : `/pastcontents/myHelpedSolvedWorry/${worryId}`;

  // 무한스크롤 관련 코드
  const getMessageList = async (pageParam: number) => {
    const data = await chatRoomMessage(pageParam, { roomid: roomId });
    const { page, totalCount, formattedPastMessages } = data;
    const isLast = (page - 1) * 10 + formattedPastMessages.length >= totalCount;
    return {
      formattedPastMessages,
      nextPage: isLast ? undefined : page + 1,
      isLast,
      hasNextPage: !isLast,
    };
  };

  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['formattedPastMessages'],
    queryFn: ({ pageParam = 1 }) => getMessageList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 1,
  });

  const roomMessage = useMemo(() => {
    let list: ChatMessage[] = [];
    chatMessages?.pages.forEach(({ formattedPastMessages }) => {
      if (Array.isArray(formattedPastMessages)) {
        list = [...list, ...formattedPastMessages];
      }
    });
    return list;
  }, [chatMessages?.pages]);

  const handleLoadMore = useMemo(
    () =>
      _.throttle(() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }, 500),
    [hasNextPage, fetchNextPage],
  );

  useObserver(loadMoreRef, handleLoadMore, {
    root: scrollContainerRef.current,
    rootMargin: '100px',
    threshold: 0.25,
  });

  // socket.io 연결 관련 코드
  useEffect(() => {
    const token = localStorage.getItem('access_Token');
    const newSocket = io('https://friendj.store/', {
      auth: {
        token: token,
      },
    });

    setSocket(newSocket);
    newSocket.emit('join room', { roomId });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on('message', (message) => {
        console.log('메세지도착');
        setSocketMessage((messages) => [...messages, message]);
      });
    }
  });

  const sendMessage = () => {
    if (socket && messageInput.trim() !== '') {
      socket.emit('chatting', { msg: messageInput });
      setMessageInput('');
    }
  };

  // 채팅 승인&거절 api 호출
  const handleChatAccept = async () => {
    try {
      await chatAccept({ roomid: roomId });
      navigate(-1);
      setChatAccepted(roomId);
      openStateModal('채팅 승인이 전달됐어요!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChatReject = async () => {
    try {
      await chatReject({ roomid: roomId });
      navigate(-1);
      setChatDelete(roomId);
      openStateModal('채팅 요청을 거절했어요');
    } catch (error) {
      console.error(error);
    }
  };

  // 기타 코드...
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
          {roomMessage && roomMessage.length > 0
            ? roomMessage.map((list, index) => (
                <MessageContainer key={index}>
                  {userId === list.userId ? (
                    <MyMessageWrapper>
                      <TimeText>{formatTime(list.createdAt)}</TimeText>
                      <MessageBubble $backColor={'#2F4768'}>
                        {list.text}
                      </MessageBubble>
                    </MyMessageWrapper>
                  ) : (
                    <MessageWrapper>
                      <MessageBubble $backColor={'#121212'}>
                        {list.text}
                      </MessageBubble>
                      <TimeText>{formatTime(list.createdAt)}</TimeText>
                    </MessageWrapper>
                  )}
                </MessageContainer>
              ))
            : !isPending && (
                <PastContentNone>
                  <NoneText>아직 대화가 시작되지 않았어요.</NoneText>
                  <NoneText>먼저 대화를 시작해보세요!</NoneText>
                </PastContentNone>
              )}
          {socketMessage.map((message, index) => (
            <div key={index}>{message.text}</div>
          ))}
          <LoadMoreDiv ref={loadMoreRef} />
          {isPending && <Loading />}
        </ChatContainer>

        {isAccepted ? (
          <InputContainer>
            <ChatInput
              type="text"
              placeholder="내용을 입력해주세요"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <SendButton onClick={sendMessage}>전송</SendButton>
          </InputContainer>
        ) : userId === commentAuthorId ? (
          <AcceptedContainer>
            <BorderBox />
            <span>1:1 대화를 수락하시겠습니까?</span>
            <div style={{ display: 'flex', gap: '5px' }}>
              <AcceptedButton
                $color={'#121212'}
                $backColor={'#eee'}
                onClick={handleChatAccept}
              >
                수락
              </AcceptedButton>
              <AcceptedButton
                $color={'#eee'}
                $backColor={'#B5B5BD'}
                onClick={handleChatReject}
              >
                거절
              </AcceptedButton>
            </div>
          </AcceptedContainer>
        ) : (
          <AcceptedContainer>
            <BorderBox />
            <span>1:1 대화 승인을 기다리는 중이에요...</span>
          </AcceptedContainer>
        )}
      </ChatroomContainer>
    </>
  );
}

export default ChatDetail;
