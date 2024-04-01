import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { myWorries, yourWorries } from '../../api/pastContentApi';
import { formatDate } from '../../utills/formatDate/formatDate';
import { Link } from 'react-router-dom';

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
        <div>보관함</div>
        <div>
          <button onClick={onClickMyWorries}>나의 고민</button>
          <button onClick={onClickYourWorries}>익명의 고민</button>
        </div>
        <div>
          {listsSelect &&
            listsSelect.map((list, index) => {
              return (
                <PastContentWrap key={index}>
                  <div>{list.icon}</div>
                  <div>
                    <div>{formatDate(list.createdAt)}</div>
                    <div className="content">{list.content}</div>
                  </div>
                  <Link to={`/pastcontents/${whoseContent}/${list.worryId}`}>
                    {'>'}
                  </Link>
                </PastContentWrap>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default PastContents;

const PastContentWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  /* 사이즈 조절 해야함. */
  max-width: 540px;
  .content {
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
