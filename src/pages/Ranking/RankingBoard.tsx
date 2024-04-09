import React, { useState, useEffect } from 'react';
import RankingModal from '../../components/modal/RankingModal';
import { fetchRankings } from '../../api/rankingApi';

interface ApiResponse {
  commentAuthorId?: number;
  likes: number;
  userId?: number;
}

interface RankingModalProps {
  isOpen: boolean;
  currentUser: number;
  accessToken: string;
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
        if ('errorCode' in response) {
          setError(response.msg);
        } else {
          setRankings(response);
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
    <RankingModal
      isOpen={isOpen}
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
    >
      <div>
        {rankings.length > 0 ? (
          <ul>
            {rankings.map((rank, index) => (
              <li
                key={index}
                style={{ fontWeight: rank.userId ? 'bold' : 'normal' }}
              >
                {index + 1}위: Likes {rank.likes}{' '}
                {rank.userId ? `(User ID: ${rank.userId})` : ''}
              </li>
            ))}
            {!userRank && rankings.length === 5 && (
              <li>6위: Your Rank (Likes: {userRank?.likes})</li>
            )}
          </ul>
        ) : (
          <p>랭킹 정보가 없습니다.</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </RankingModal>
  );
};

export default RankingBoard;
