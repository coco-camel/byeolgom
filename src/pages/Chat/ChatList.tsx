import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { chatRoomList } from '../../api/chatRoom';
import { ChatRoom } from '../../types/ChatRoom.interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '../../hooks/observer/useObserver';
import _ from 'lodash';
import { formatDate } from '../../utills/formatDate/formatDate';
import Loading from '../../components/loading/Loading';
import {
  LoadMoreDiv,
  LockerListWrap,
  PastContentContainer,
  PastContentNone,
  PastContentWrap,
  PastContentsContainer,
  PageHeader,
  NoneText,
} from './ChatStyle';

function ChatList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef(null);

  const getChatList = async (pageParam: number) => {
    const data = await chatRoomList(pageParam);
    return {
      result: data,
      nextPage: pageParam + 1,
      isLast: data.length < 10 || data.length === 0,
      hasNextPage: data.length === 10,
    };
  };

  const {
    data: pastchat,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['chatRooms'],
    queryFn: ({ pageParam = 1 }) => getChatList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.length === 0) {
        return undefined;
      }
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    retry: 1,
    staleTime: 1000 * 20,
  });

  const pastList = useMemo(() => {
    let list: ChatRoom[] = [];
    pastchat?.pages.forEach(({ result }) => {
      list = [...list, ...result];
    });
    return list;
  }, [pastchat]);

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

  return (
    <>
      <PageHeader>
        <p>채팅</p>
      </PageHeader>

      <PastContentsContainer>
        <LockerListWrap>
          {pastList && pastList.length > 0
            ? pastList.map((list, index) => (
                <Link to={`/pastcontents/${list.roomId}`} key={index}>
                  <PastContentWrap $margin={'15px 0'}>
                    <PastContentContainer>
                      <div>{formatDate(list.createdAt)}</div>
                      {/* <div className="content">{list.content}</div> */}
                    </PastContentContainer>
                  </PastContentWrap>
                </Link>
              ))
            : !isPending && (
                <PastContentWrap>
                  <PastContentNone>
                    <NoneText>아직 시작된 채팅이 없어요!</NoneText>
                    <NoneText>더 대화를 나눠보고 싶은 유저에게</NoneText>
                    <NoneText>답례 전송과 함께 채팅 요청을 보내보세요</NoneText>
                  </PastContentNone>
                </PastContentWrap>
              )}
          <LoadMoreDiv ref={loadMoreRef} />
        </LockerListWrap>
        {isPending && <Loading />}
      </PastContentsContainer>
    </>
  );
}

export default ChatList;
