// RankingBoard.tsx
import { useEffect } from 'react';
import { useRankingBoard } from '../../hooks/queries/useRankingBoard';
import RankingList from './RankingList';
import styled from 'styled-components';
import threeDot from '/assets/images/threeDot.png';
import { rankingStore } from '../../store/rankingStore';

function RankingBoard() {
  const { isOpen, isCurrentUser, initializeCurrentUser } = rankingStore();
  const RankingBoardQuery = useRankingBoard(isOpen);

  useEffect(() => {
    if (RankingBoardQuery.data && RankingBoardQuery.data.length > 0) {
      initializeCurrentUser(RankingBoardQuery.data);
    }
  }, [RankingBoardQuery.data, initializeCurrentUser]);

  if (!isOpen) return null;

  return (
    <RankingContainer>
      <RankingWrapper>
        {RankingBoardQuery.data &&
          RankingBoardQuery.data
            .slice(0, -1)
            .map((rank, index) => (
              <RankingList
                key={index}
                rank={index + 1}
                nickname={rank.nickname}
                likes={rank.likes}
                userId={rank.userId}
                isCurrentUser={isCurrentUser(rank.userId)}
              />
            ))}
        <img
          className="threeDot"
          src={threeDot}
          alt="ThreeDot"
          color="#B5B5BD"
        />
        {RankingBoardQuery.data && RankingBoardQuery.data.length > 1 && (
          <RankingList
            rank={
              RankingBoardQuery.data[RankingBoardQuery.data.length - 1].rank ||
              'N/A'
            }
            nickname={
              RankingBoardQuery.data[RankingBoardQuery.data.length - 1].nickname
            }
            likes={
              RankingBoardQuery.data[RankingBoardQuery.data.length - 1].likes
            }
            userId={
              RankingBoardQuery.data[RankingBoardQuery.data.length - 1].userId
            }
            isCurrentUser={isCurrentUser(
              RankingBoardQuery.data[RankingBoardQuery.data.length - 1].userId,
            )}
          />
        )}
      </RankingWrapper>
      {RankingBoardQuery.isError && (
        <Rank style={{ color: 'red' }}>{RankingBoardQuery.error?.message}</Rank>
      )}
    </RankingContainer>
  );
}

export default RankingBoard;

const RankingContainer = styled.div`
  padding: 20px;
  height: 70%;
`;

const RankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 0;
  height: fit-content;
  top: 25%;

  &:last-child {
    border-bottom: none;
  }

  .threeDot {
    width: 20%;
    margin: 0 auto;
    padding-top: 10px;
  }
`;

const Rank = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: normal;
`;
