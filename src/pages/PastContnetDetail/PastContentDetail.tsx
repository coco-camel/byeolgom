import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { worriesDetail } from '../../api/pastContentApi';
import { formatDate } from '../../utills/formatDate/formatDate';
import { PastContent } from '../../types/PastContent.interface';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import styled from 'styled-components';
import PastContentComment from './PastContentComment';

function PastContentDetail() {
  const [pastContentDetail, setPastContentDetail] = useState<PastContent>();
  const params = useParams() as Readonly<WorriesDetailParams>;

  useEffect(() => {
    const fetchData = async () => {
      const data = await worriesDetail(params);
      setPastContentDetail(data);
    };
    fetchData();
  }, [params]);

  return (
    <>
      {pastContentDetail && (
        <div>
          <PastContentWrap>
            <div>{pastContentDetail.icon}</div>
            <PastContentContainer>
              <PastContentTitle>
                {formatDate(pastContentDetail.createdAt)}
              </PastContentTitle>
              <PastContentTitle>{pastContentDetail.content}</PastContentTitle>
            </PastContentContainer>
          </PastContentWrap>
          <LockerListWrap>
            {pastContentDetail.comments.map((item, index) => (
              <PastContentComment key={index} comment={item} />
            ))}
          </LockerListWrap>
        </div>
      )}
    </>
  );
}

export default PastContentDetail;

const LockerListWrap = styled.div`
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

const PastContentTitle = styled.div`
  color: #e2e2e2;
  padding: 5px 0;
`;

const PastContentContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
  overflow: hidden;
  div {
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
  margin: 10px 0;
  padding: 0 20px;
  .content {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
