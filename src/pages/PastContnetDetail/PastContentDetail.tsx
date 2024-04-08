import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { worriesDetail } from '../../api/pastContentApi';
import { formatDate } from '../../utills/formatDate/formatDate';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import PastContentComment from './PastContentComment';
import styled from 'styled-components';
import chevronLeft from '/assets/chevronLeft.svg';

function PastContentDetail() {
  const params = useParams() as Readonly<WorriesDetailParams>;
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const {
    data: pastContentDetail,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pastContentDetail', params],
    queryFn: () => worriesDetail(params),
    staleTime: 1000 * 60,
    gcTime: 1000 * 120,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <>
      {pastContentDetail && (
        <div>
          <PastContentHeader>
            <button onClick={handleBackNavigation}>
              <img src={chevronLeft} width={20} height={20} />
            </button>
          </PastContentHeader>
          <PastContentWrap>
            <div>{pastContentDetail.icon}</div>
            <PastContentContainer>
              <div>{formatDate(pastContentDetail.createdAt)}</div>
              <div>{pastContentDetail.content}</div>
            </PastContentContainer>
          </PastContentWrap>
          <CommentLayOut>
            <CommentListWrap>
              {pastContentDetail.comments.map((item, index) => (
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
    div {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 480px) {
    div {
      font-size: 1rem;
    }
  }
`;

const PastContentContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
  overflow: hidden;
  div {
    color: #e2e2e2;
    padding: 5px 0;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;
const PastContentWrap = styled.div`
  display: flex;
  align-items: center;
  background-color: #353535;
  padding: 0 20px;
  .content {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
