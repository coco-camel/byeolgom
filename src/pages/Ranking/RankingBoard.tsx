// RankingBoard.tsx
import React from 'react';
import { useRankingBoard } from '../../hooks/queries/useRankingBoard';
import { RankingModalProps } from '../../types/RankingProps.interface';
import styled from 'styled-components';

const RankingBoard: React.FC<RankingModalProps> = ({ isOpen }) => {
  const RankingBoardQuery = useRankingBoard(isOpen);

  if (!isOpen) return null;

  return (
    <RankingContainer>
      {RankingBoardQuery.data && RankingBoardQuery.data.length > 0 ? (
        <RankingWrapper>
          {RankingBoardQuery.data.slice(0, 5).map((rank, index) => (
            <li className="RankerList" key={index}>
              <p
                className="Ranking"
                style={{
                  fontWeight: 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {index + 1}위
              </p>
              <p
                className="UserName"
                style={{
                  fontWeight: 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {rank.nickname}
              </p>
              <p
                className="Likes"
                style={{
                  fontWeight: 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {rank.likes}번
              </p>
            </li>
          ))}
          {RankingBoardQuery.data.length > 5 && (
            <li style={{ fontWeight: 'bold', color: '#FED56B' }}>
              {RankingBoardQuery.data[5].rank}위
              {RankingBoardQuery.data[5].nickname}
              {RankingBoardQuery.data[5].likes}번
            </li>
          )}
        </RankingWrapper>
      ) : (
        <p>랭킹 정보가 없습니다.</p>
      )}
      {RankingBoardQuery.isError && (
        <p style={{ color: 'red' }}>{RankingBoardQuery.error?.message}</p>
      )}
    </RankingContainer>
  );
};

export default RankingBoard;

const RankingContainer = styled.div`
  padding: 20px;
  height: 70%;
`;

const RankingWrapper = styled.div`
  position: relative;
  padding: 0;
  height: fit-content;
  top: 25%;

  .RankerList {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid grey;

    &:last-child {
      border-bottom: none;
    }
  }

  p {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
`;
