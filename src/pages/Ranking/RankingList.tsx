import styled from 'styled-components';

interface RankerListItemProps {
  rank: number | string | undefined;
  nickname?: string;
  likes: number;
  isCurrentUser: boolean;
}

const RankingList: React.FC<RankerListItemProps> = ({
  rank,
  nickname,
  likes,
  isCurrentUser,
}) => {
  return (
    <RankerList $highlight={isCurrentUser}>
      <Rank className="Ranking">{rank}위</Rank>
      <Rank className="UserName">{nickname}</Rank>
      <Rank className="Likes">{likes}번</Rank>
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
