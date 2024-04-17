import styled, { keyframes } from 'styled-components';
interface SkeletonSpanProps {
  $width?: string;
  $height?: string;
  $margin?: string;
}
function SkeletonItem() {
  return (
    <PastContentWrap>
      <SkeletonDiv $width="30px" $height="30px" />
      <PastContentContainer>
        <SkeletonDiv $width="85px" $height="10px" $margin="2px 0" />
        <SkeletonDiv $width="90%" $height="14px" $margin="3px 0" />
      </PastContentContainer>
      <SkeletonDiv $width="17px" $height="17px" />
    </PastContentWrap>
  );
}

export default SkeletonItem;

const lodingMotion = keyframes`
  0% {
    background-position: 0;
  }
  100% {
    background-position: 40rem 0;
  }
`;

const SkeletonDiv = styled.div<SkeletonSpanProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  border-radius: 5px;
  background: linear-gradient(to right, #4e4e4e, #d1d1d1, #4e4e4e);
  background-size: 1000px 100%;
  animation: ${lodingMotion} 1.5s infinite linear;
`;

const PastContentContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
`;

const PastContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;
