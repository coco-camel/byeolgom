import styled, { keyframes } from 'styled-components';

interface WaveProps {
  $top?: string;
  $animationDuration?: string;
}

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

function WaveBackGround() {
  return (
    <>
      <Wave $top="70%" $animationDuration="50s" />
      <Wave $top="72%" $animationDuration="30s" />
      <Wave $top="80%" $animationDuration="60s" />
    </>
  );
}

export default WaveBackGround;

const Wave = styled.div<WaveProps>`
  position: absolute;
  border-radius: 40%;
  background-color: white;
  opacity: 0.04;
  top: ${(props) => props.$top};
  animation: ${rotateAnimation} ${(props) => props.$animationDuration} linear
    infinite;

  @media screen and (min-width: 401px) and (max-width: 640px) {
    right: -120%;
    width: 2000px;
    height: 2000px;
  }

  @media screen and (max-width: 400px) {
    right: -190%;
    width: 2000px;
    height: 2000px;
  }
  @media screen and (min-width: 641px) {
    right: -90%;
    width: 1000px;
    height: 1000px;
  }
`;
