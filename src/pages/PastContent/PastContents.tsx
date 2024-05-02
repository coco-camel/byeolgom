import { useMemo, useRef } from 'react';
import { myWorries, yourWorries } from '../../api/pastContentApi';
import PastContentsList from './PastContentsList';
import { Worry } from '../../types/WorryContent.interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash';
import useObserver from '../../hooks/observer/useObserver';
import { useWhoseContentStore } from '../../store/whoseContentStore';
import { useShallow } from 'zustand/react/shallow';
import { Button, LockerTabWrap, PastContentHeader } from './pastContentsStyle';

function PastContents() {
  const [whoseContent, setWhoseContentState] = useWhoseContentStore(
    useShallow((state) => [state.whoseContent, state.setWhoseContentState]),
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef(null);

  const getPastContent = async (pageParam: number) => {
    const data = await (
      whoseContent === 'mySolvedWorry' ? myWorries : yourWorries
    )(pageParam);
    return {
      result: data,
      nextPage: pageParam + 1,
      isLast: data.length < 10 || data.length === 0,
      hasNextPage: data.length === 10,
    };
  };

  const {
    data: pastContent,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['worries', whoseContent],
    queryFn: ({ pageParam = 1 }) => getPastContent(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.length === 0) {
        return undefined;
      }
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    retry: 1,
    staleTime: 1000 * 20,
    gcTime: 1000 * 60,
  });

  const pastContents = useMemo(() => {
    let list: Worry[] = [];
    pastContent?.pages.forEach(({ result }) => {
      list = [...list, ...result];
    });
    return list;
  }, [pastContent]);

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
      <PastContentHeader $content={'center'}>
        <span>보관함</span>
      </PastContentHeader>
      <LockerTabWrap>
        <Button
          className={whoseContent === 'mySolvedWorry' ? 'active' : ''}
          onClick={() => setWhoseContentState('mySolvedWorry')}
        >
          나의 고민
        </Button>
        <Button
          className={whoseContent === 'myHelpedSolvedWorry' ? 'active' : ''}
          onClick={() => setWhoseContentState('myHelpedSolvedWorry')}
        >
          익명의 고민
        </Button>
      </LockerTabWrap>
      <PastContentsList
        pastContents={pastContents}
        whoseContent={whoseContent}
        isPending={isPending}
        ref={loadMoreRef}
      />
    </>
  );
}

export default PastContents;
