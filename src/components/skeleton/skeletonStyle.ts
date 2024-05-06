import styled, { keyframes } from 'styled-components';

export const lodingMotion = keyframes`
  0% {
    background-position: 0;
  }
  100% {
    background-position: 40rem 0;
  }
`;
interface SkeletonSpanProps {
  $width?: string;
  $height?: string;
  $margin?: string;
}

export const SkeletonDiv = styled.div<SkeletonSpanProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  border-radius: 5px;
  background: linear-gradient(to right, #4e4e4e, #d1d1d1, #4e4e4e);
  background-size: 1000px 100%;
  animation: ${lodingMotion} 1.5s infinite linear;
`;

export const PastContentContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
`;

export const PastContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;
