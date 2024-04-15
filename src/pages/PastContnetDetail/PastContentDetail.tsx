import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utills/formatDate/formatDate';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import PastContentComment from './PastContentComment';
import styled from 'styled-components';
import back from '/assets/images/back.svg';
import rocketA from '/assets/images/rocketA.svg';
import rocketB from '/assets/images/rocketB.svg';
import rocketC from '/assets/images/rocketC.svg';
import { usePastContentDetail } from '../../hooks/queries/usePastContentDetail';

function PastContentDetail() {
  const rocket: { [key: string]: string } = {
    rocketA: rocketA,
    rocketB: rocketB,
    rocketC: rocketC,
  };
  const params = useParams() as Readonly<WorriesDetailParams>;
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const pastContentDetailQuery = usePastContentDetail(params);

  if (pastContentDetailQuery.isPending) return <div>Loading...</div>;

  if (pastContentDetailQuery.isError) return <div>Error</div>;

  return (
    <>
      {pastContentDetailQuery.data && (
        <div>
          <PastContentHeader>
            <button onClick={handleBackNavigation}>
              <img src={back} width={20} height={20} />
            </button>
          </PastContentHeader>
          <PastContentWrap>
            <img
              src={rocket[`rocket${pastContentDetailQuery.data.icon}`]}
              width={20}
              height={24}
            />
            <PastContentContainer>
              <div>{formatDate(pastContentDetailQuery.data.createdAt)}</div>
              <div>{pastContentDetailQuery.data.content}</div>
            </PastContentContainer>
          </PastContentWrap>
          <CommentLayOut>
            <CommentListWrap>
              {pastContentDetailQuery.data.comments.map((item, index) => (
                <PastContentComment key={index} comment={item} />
              ))}
            </CommentListWrap>
          </CommentLayOut>
        </div>
      )}
    </>
  );
}

export default PastContentDetail;

const PastContentHeader = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 20px;
`;

const CommentLayOut = styled.div`
  display: flex;
  justify-content: center;
`;
const CommentListWrap = styled.div`
  width: 100%;
  height: 370px;
  overflow: auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  @media (max-width: 640px) {
    width: 90vw;
    height: 75vh;
  }
`;

const PastContentContainer = styled.div`
  flex-grow: 1;
  padding: 0 20px;
  overflow: hidden;
  div {
    color: #e2e2e2;
    font-size: 14px;
    padding: 2px 0;
  }
  :nth-child(1) {
    font-size: 10px;
  }
  @media (max-width: 640px) {
    :nth-child(1) {
      font-size: 12px;
    }
    :nth-child(2) {
      font-size: 1rem;
    }
  }
  @media (max-width: 480px) {
    :nth-child(1) {
      font-size: 10px;
    }
    :nth-child(2) {
      font-size: 14px;
    }
  }
`;
const PastContentWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  .content {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
