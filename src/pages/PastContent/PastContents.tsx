import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { myWorries, yourWorries } from '../../api/pastContentApi';
import PastContentsList from './PastContentsList';
import { Worry } from '../../types/WorryContent.interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash';

function PastContents() {
  const [whoseContent, setWhoseContent] = useState('mySolvedWorry');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const getPastContent = async (pageParam: number) => {
    const data = await (
      whoseContent === 'mySolvedWorry' ? myWorries : yourWorries
    )(pageParam);
    return {
      result: data,
      nextPage: pageParam + 1,
      isLast: data.length < 10,
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
    queryFn: ({ pageParam = 0 }) => getPastContent(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
    },
    staleTime: 1000 * 20,
  });

  const pastContents = useMemo(() => {
    let list: Worry[] = [];
    pastContent?.pages.forEach(({ result }) => {
      list = [...list, ...result];
    });
    return list;
  }, [pastContent]);

  useEffect(() => {
    const handleLoadMore = _.throttle(() => {
      if (hasNextPage) {
        fetchNextPage();
      }
    }, 500);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
      handleLoadMore.cancel();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div>
      <PastContentHeader>
        <h1>보관함</h1>
      </PastContentHeader>
      <LockerTabWrap>
        <Button
          className={whoseContent === 'mySolvedWorry' ? 'active' : ''}
          onClick={() => setWhoseContent('mySolvedWorry')}
        >
          나의 고민
        </Button>
        <Button
          className={whoseContent === 'myHelpedSolvedWorry' ? 'active' : ''}
          onClick={() => setWhoseContent('myHelpedSolvedWorry')}
        >
          익명의 고민
        </Button>
      </LockerTabWrap>
      <PastContentsContainer>
        <PastContentsList
          listsSelect={pastContents}
          whoseContent={whoseContent}
          isPending={isPending}
          ref={loadMoreRef}
        />
      </PastContentsContainer>
    </div>
  );
}

export default PastContents;
const PastContentsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding-bottom: 15px;
  color: #313131;
  width: 50%;
  border-bottom: 2px solid #313131;

  &.active {
    color: #e2e2e2;
    border-bottom: 2px solid #e2e2e2;
  }
  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const LockerTabWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 100%;
  box-sizing: border-box;
`;
const PastContentHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 16px;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;
