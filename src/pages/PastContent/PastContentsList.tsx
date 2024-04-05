import styled from 'styled-components';
import { formatDate } from '../../utills/formatDate/formatDate';
import { Link } from 'react-router-dom';
import rocket from '/assets/rocket.svg';
import star from '/assets/star.svg';
import chevronLeft from '/assets/chevronLeft.svg';
import { forwardRef } from 'react';

interface PastContentsListProps {
  listsSelect: worryList[];
  whoseContent: string;
}

interface worryList {
  worryId: number;
  icon: string;
  content: string;
  createdAt: Date;
}

const PastContentsList = forwardRef<HTMLDivElement, PastContentsListProps>(
  ({ listsSelect, whoseContent }, ref) => {
    return (
      <LockerListWrap>
        {listsSelect &&
          listsSelect.map((list, index) => (
            <Link
              to={`/pastcontents/${whoseContent}/${list.worryId}`}
              key={index}
            >
              <PastContentWrap>
                <img
                  src={whoseContent === 'mySolvedWorry' ? rocket : star}
                  style={{ width: '24px' }}
                />
                <PastContentContainer>
                  <PastContentTitle>
                    {formatDate(list.createdAt)}
                  </PastContentTitle>
                  <PastContentTitle className="content">
                    {list.content}
                  </PastContentTitle>
                </PastContentContainer>
                <img src={chevronLeft} />
              </PastContentWrap>
            </Link>
          ))}
        <LoadMoreDiv ref={ref} />
      </LockerListWrap>
    );
  },
);

export default PastContentsList;

const LoadMoreDiv = styled.div`
  height: 10px;
`;

const PastContentTitle = styled.div`
  color: #e2e2e2;
  padding: 5px 0;
`;
const PastContentContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
  overflow: hidden;
`;

const LockerListWrap = styled.div`
  width: 100%;
  height: 370px;
  overflow: auto;
  padding: 0 20px;
  box-sizing: border-box;
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

const PastContentWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  .content {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
