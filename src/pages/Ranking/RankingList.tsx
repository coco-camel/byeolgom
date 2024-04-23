import styled from 'styled-components';
import { rankingStore } from '../../store/rankingStore';

interface RankerListItemProps {
  rank: number | string | undefined;
  nickname?: string;
  likes: number;
  userId: number;
  isCurrentUser: boolean;
}

const RankingList: React.FC<RankerListItemProps> = ({
  rank,
  nickname,
  likes,
  userId,
}) => {
  const isCurrentUser = rankingStore((state) => state.isCurrentUser(userId));

  return (
    <RankerList $highlight={isCurrentUser}>
      <Rank>{`${rank}위`}</Rank>
      <Rank>{nickname}</Rank>
      <Rank>{`${likes}번`}</Rank>
    </RankerList>
  );
};

export default RankingList;

const RankerList = styled.li<{ $highlight: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid grey;
  width: 100%;
  color: ${({ $highlight }) => ($highlight ? '#E88439' : '#eee')};
`;

const Rank = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: normal;
`;
