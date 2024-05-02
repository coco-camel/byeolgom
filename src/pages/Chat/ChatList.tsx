import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { chatRoomList } from '../../api/chatRoomApi';
import { ChatRoom } from '../../types/ChatRoom.interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '../../hooks/observer/useObserver';
import _ from 'lodash';
import { formatDate } from '../../utills/formatDate/formatDate';
import Loading from '../../components/loading/Loading';
import { useChatInfoStore } from '../../store/chatInfoStore';
import rocketA from '@/rocketA.svg';
import rocketB from '@/rocketB.svg';
import rocketC from '@/rocketC.svg';
import star from '@/star.svg';
import {
  LoadMoreDiv,
  LockerListWrap,
  PastContentContainer,
  PastContentNone,
  PastContentWrap,
  PastContentsContainer,
  PageHeader,
  NoneText,
  UnreadIndicator,
} from './ChatStyle';

function ChatList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef(null);
  const { setRoomId, setWorryId, setIsOwner, setIsAccepted } =
    useChatInfoStore();

  const getChatList = async (pageParam: number) => {
    const data = await chatRoomList(pageParam);
    const { page, totalCount, rooms } = data;
    const isLast = (page - 1) * 10 + rooms.length >= totalCount;
    return {
      rooms,
      nextPage: isLast ? undefined : page + 1,
      isLast,
      hasNextPage: !isLast,
    };
  };

  const {
    data: chatList,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['rooms'],
    queryFn: ({ pageParam = 1 }) => getChatList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 1,
    staleTime: 1000 * 20,
  });

  const roomList = useMemo(() => {
    let list: ChatRoom[] = [];
    chatList?.pages.forEach(({ rooms }) => {
      if (Array.isArray(rooms)) {
        list = [...list, ...rooms];
      }
    });
    return list;
  }, [chatList]);

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

  const handleChatDetail = (
    roomId: number,
    worryId: number,
    isOwner: boolean,
    isAccepted: boolean,
  ) => {
    setRoomId(roomId);
    setWorryId(worryId);
    setIsOwner(isOwner);
    setIsAccepted(isAccepted);
  };

  function getStatusMessage(status: string) {
    switch (status) {
      case 'PENDING':
        return '1:1 채팅 요청 중입니다...';
      case 'ACCEPTED':
        return '1:1 채팅 요청이 수락되었습니다';
      default:
        return '';
    }
  }

  const rocket: { [key: string]: string } = {
    rocketA: rocketA,
    rocketB: rocketB,
    rocketC: rocketC,
  };

  return (
    <>
      <PageHeader>
        <p>채팅</p>
      </PageHeader>

      <PastContentsContainer>
        <LockerListWrap>
          {roomList && roomList.length > 0
            ? roomList.map((list, index) => (
                <Link
                  to={{
                    pathname: `/chatlist/${list.roomId}`,
                  }}
                  onClick={() =>
                    handleChatDetail(
                      list.roomId,
                      list.worryId,
                      list.isOwner,
                      list.isAccepted,
                    )
                  }
                  key={index}
                >
                  <PastContentWrap $hasEntered={list.hasEntered}>
                    <img
                      src={list.isOwner ? rocket[`rocket${list.icon}`] : star}
                      style={{
                        width: '30px',
                        height: '30px',
                        marginLeft: '20px',
                        marginRight: '10px',
                      }}
                    />
                    <PastContentContainer>
                      <div>{formatDate(list.updatedAt)}</div>
                      <div>{getStatusMessage(list.status)}</div>
                      {!list.hasEntered && <UnreadIndicator />}
                    </PastContentContainer>
                  </PastContentWrap>
                </Link>
              ))
            : !isPending && (
                <PastContentNone>
                  <NoneText>아직 시작된 채팅이 없어요!</NoneText>
                  <NoneText>더 대화를 나눠보고 싶은 유저에게</NoneText>
                  <NoneText>답례 전송과 함께 채팅 요청을 보내보세요</NoneText>
                </PastContentNone>
              )}
          <LoadMoreDiv ref={loadMoreRef} />
        </LockerListWrap>
        {isPending && <Loading />}
      </PastContentsContainer>
    </>
  );
}

export default ChatList;
