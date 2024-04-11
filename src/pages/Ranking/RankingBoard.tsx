// RankingBoard.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRankings } from '../../api/rankingApi';
import styled from 'styled-components';

interface ApiResponse {
  commentAuthorId?: number;
  likes: number;
  userId?: number;
}

interface RankingModalProps {
  isOpen: boolean;
  currentUser: number;
  onRequestClose: () => void;
}

const RankingBoard: React.FC<RankingModalProps> = ({ isOpen, currentUser }) => {
  const {
    data: rankings,
    error,
    isError,
  } = useQuery<ApiResponse[], Error>({
    queryKey: ['rankings'],
    queryFn: fetchRankings,
    enabled: isOpen,
  });

  const userRank =
    rankings?.find((rank) => rank.userId === currentUser) || null;

  if (!isOpen) return null;

  return (
    <RankingContainer>
      {rankings && rankings.length > 0 ? (
        <RankingWrapper>
          {rankings.slice(0, 5).map((rank, index) => (
            <li className="RankerList" key={index}>
              <p
                className="Ranking"
                style={{
                  fontWeight: rank.userId ? 'normal' : 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {index + 1}위
              </p>
              <p
                className="UserName"
                style={{
                  fontWeight: rank.userId ? 'normal' : 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                username
              </p>
              <p
                className="Likes"
                style={{
                  fontWeight: rank.userId ? 'normal' : 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {rank.likes}번
              </p>
            </li>
          ))}
          {!userRank && rankings.length === 5 && (
            <li style={{ fontWeight: 'bold', color: '#FED56B' }}>
              6위: Your Rank
            </li>
          )}
        </RankingWrapper>
      ) : (
        <p>랭킹 정보가 없습니다.</p>
      )}
      {isError && <p style={{ color: 'red' }}>{error?.message}</p>}
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
