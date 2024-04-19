import { useRankingBoard } from '../../hooks/queries/useRankingBoard';
import { RankingModalProps } from '../../types/RankingProps.interface';
import styled from 'styled-components';
import threeDot from '/assets/images/threeDot.png';

function RankingBoard({ isOpen }: RankingModalProps) {
  const RankingBoardQuery = useRankingBoard(isOpen);

  if (!isOpen) return null;

  return (
    <RankingContainer>
      {RankingBoardQuery.data && RankingBoardQuery.data.length > 0 ? (
        <RankingWrapper>
          {RankingBoardQuery.data.slice(0, 5).map((rank, index) => (
            <RankerList key={index}>
              <Rank
                className="Ranking"
                style={{
                  fontWeight: 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {index + 1}위
              </Rank>
              <Rank
                className="UserName"
                style={{
                  fontWeight: 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {rank.nickname}
              </Rank>
              <Rank
                className="Likes"
                style={{
                  fontWeight: 'normal',
                  color: rank.userId ? '#FED56B' : 'white',
                }}
              >
                {rank.likes}번
              </Rank>
            </RankerList>
          ))}
          <img className="threeDot" src={threeDot} alt="ThreeDot" />
          {RankingBoardQuery.data.length > 5 && (
            <NoneRanker>
              <Rank className="exRanking">
                {RankingBoardQuery.data[5].rank}위
              </Rank>
              <Rank className="exUserName">
                {RankingBoardQuery.data[5].nickname}
              </Rank>
              <Rank className="exLikes">
                {RankingBoardQuery.data[5].likes}번
              </Rank>
            </NoneRanker>
          )}
        </RankingWrapper>
      ) : (
        <Rank>랭킹 정보가 없습니다.</Rank>
      )}
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

const RankerList = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid grey;
  width: 100%;
`;

const NoneRanker = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding: 15px 20px;
  font-weight: normal;
  color: #fed56b;
`;

const Rank = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: normal;
`;
