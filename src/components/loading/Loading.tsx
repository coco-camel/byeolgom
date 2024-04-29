import pageLoading from '@/pageLoading.gif';
import styled from 'styled-components';

function Loading() {
  return (
    <MainWrap>
      <img className="pageLoading" src={pageLoading} />
      <Test>로딩중</Test>
    </MainWrap>
  );
}

export default Loading;

const MainWrap = styled.div`
  position: absolute;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.loadingBG};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .pageLoading {
    position: relative;
    width: 320px;
  }
`;

const Test = styled.p`
  position: absolute;
  top: 50%;
  font-size: 10px;
  font-weight: 500;
  color: #eee;
`;
