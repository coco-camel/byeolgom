import styled, { keyframes } from 'styled-components';

interface StarsProps {
  $left?: string;
  $top?: string;
  $delay?: string;
}

function StarBackGround() {
  return (
    <>
      <Stars $left="10%" $top="20%" $delay="0s" />
      <Stars $left="60%" $top="25%" $delay="0.5s" />
      <Stars $left="90%" $top="30%" $delay="1s" />
      <Stars $left="67%" $top="8%" $delay="1.5s" />
    </>
  );
}

export default StarBackGround;

const twinkle = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

const Stars = styled.div<StarsProps>`
  position: absolute;
  width: 3px;
  height: 3px;
  pointer-events: none;
  background: transparent;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  z-index: -1;

  &::before {
    content: '+';
    position: absolute;
    color: #fff;
    animation: ${twinkle} 2s infinite;
    animation-delay: ${(props) => props.$delay};
  }
`;
