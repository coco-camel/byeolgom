import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { myWorries, yourWorries } from '../../api/pastContentApi';
import { formatDate } from '../../utills/formatDate/formatDate';
import { Link } from 'react-router-dom';
import rocket from '/assets/rocket.svg';
import star from '/assets/star.svg';
import chevronLeft from '/assets/chevronLeft.svg';

interface worryList {
  worryId: number;
  icon: string;
  content: string;
  createdAt: Date;
}

function PastContents() {
  const [listsSelect, setListSelect] = useState<worryList[]>([]);
  const [whoseContent, setWhoseContent] = useState('mySolvedWorry');
  const onClickMyWorries = async () => {
    setWhoseContent('mySolvedWorry');
    const data = await myWorries();
    setListSelect(data.worries);
    console.log(data.worries);
  };

  const onClickYourWorries = async () => {
    setWhoseContent('myHelpedSolvedWorry');
    const data = await yourWorries();
    setListSelect(data.worries);
    console.log(data.worries);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await myWorries();
      setListSelect(data.worries);
      console.log(data.worries);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <LockerTitle>
          <h1>보관함</h1>
        </LockerTitle>
        <LockerTabWrap>
          <Button
            className={whoseContent === 'mySolvedWorry' ? 'active' : ''}
            onClick={onClickMyWorries}
          >
            나의 고민
          </Button>
          <Button
            className={whoseContent === 'myHelpedSolvedWorry' ? 'active' : ''}
            onClick={onClickYourWorries}
          >
            익명의 고민
          </Button>
        </LockerTabWrap>
        <LockerListWrap>
          {listsSelect &&
            listsSelect.map((list, index) => {
              return (
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
                      <div>{formatDate(list.createdAt)}</div>
                      <div className="content">{list.content}</div>
                    </PastContentContainer>
                    <img src={chevronLeft} />
                  </PastContentWrap>
                </Link>
              );
            })}
        </LockerListWrap>
      </div>
    </>
  );
}

export default PastContents;
const PastContentContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
  overflow: hidden;
`;

const LockerListWrap = styled.div`
  width: 100%;
  height: 350px;
  padding: 0 10px;
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding-bottom: 10px;
  color: #767676;
  width: 50%;
  border-bottom: 2px solid #767676;

  &:hover {
    color: #2f2f2f;
    border-bottom: 2px solid #2f2f2f;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #2f2f2f;
  }

  &.active {
    color: #2f2f2f;
    border-bottom: 2px solid #2f2f2f;
  }
`;

const LockerTabWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
`;
const LockerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  h1 {
    font-size: 16px;
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
