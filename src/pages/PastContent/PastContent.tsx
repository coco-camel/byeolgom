import { useState } from 'react';
import styled from 'styled-components';
interface worryList {
  id: number;
  type: boolean;
  title: string;
  content: string;
  date: string;
}
function PastContent() {
  const [listsSelect, setListSelect] = useState<worryList[]>([]);
  const onClickMyWorry = () => {
    // setListSelect();
  };
  const onClickYourWorry = () => {
    // setListSelect();
  };
  return (
    <>
      <div>
        <div>
          <button onClick={onClickMyWorry}>해결된 나의 고민</button>
          <button onClick={onClickYourWorry}>내가 해결한 고민</button>
        </div>
        <div>
          {listsSelect && (
            <div>
              <PastContentTitleWrap>
                <div>who?</div>
                <div>time</div>
              </PastContentTitleWrap>
              <div>content</div>
            </div>
          )}
        </div>
      </div>
      <div>footer</div>
    </>
  );
}

export default PastContent;

const PastContentTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
