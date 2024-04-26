import styled from 'styled-components';
import { rankingStore } from '../../store/rankingStore';
import { useThemeStore } from '../../store/themeStore';

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
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? '#eee' : '#000';

  return (
    <RankerList $highlight={isCurrentUser} $theme={theme}>
      <Rank>{`${rank}위`}</Rank>
      <Rank>{nickname}</Rank>
      <Rank>{`${likes}번`}</Rank>
    </RankerList>
  );
};

export default RankingList;

interface highlightProps {
  $highlight: boolean;
  $theme: string;
}

const RankerList = styled.li<highlightProps>`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid grey;
  width: 100%;
  color: ${({ $highlight, $theme }) => ($highlight ? '#E88439' : $theme)};
`;

const Rank = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: normal;
`;
