import React, { useState, useEffect } from 'react';
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
  const [rankings, setRankings] = useState<ApiResponse[]>([]);
  const [error, setError] = useState<string>('');
  const [userRank, setUserRank] = useState<ApiResponse | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchAndSetRankings = async () => {
      try {
        const response = await fetchRankings();
        console.log(response);
        if ('errorCode' in response) {
          setError(response.msg);
        } else {
          setRankings(response.slice(0, 5));
          const currentUserRank = response.find(
            (rank: ApiResponse) => rank.userId === currentUser,
          );
          setUserRank(currentUserRank || null);
        }
      } catch (err) {
        setError('랭킹 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchAndSetRankings();
  }, [isOpen, currentUser]);

  return (
    <RankingContainer>
      {rankings.length > 0 ? (
        <RankingWrapper>
          {rankings.map((rank, index) => (
            <li className="RankerList" key={index}>
              <p
                className="Ranking"
                style={{
                  fontWeight: rank.userId ? 'bold' : 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {index + 1}위
              </p>
              <p
                className="UserName"
                style={{
                  fontWeight: rank.userId ? 'bold' : 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                username
              </p>
              <p
                className="Likes"
                style={{
                  fontWeight: rank.userId ? 'bold' : 'normal',
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </RankingContainer>
  );
};

export default RankingBoard;

const RankingContainer = styled.div`
  padding: 20px;
`;

const RankingWrapper = styled.div`
  top: 20%;
  list-style: none;
  padding: 0;
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
