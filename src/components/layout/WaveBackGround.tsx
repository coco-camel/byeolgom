import styled, { keyframes } from 'styled-components';

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
    <AniWrap>
      <FristWave />
      <SecoundWave />
      <ThirdWave />
    </AniWrap>
  );
}

export default WaveBackGround;

const AniWrap = styled.div`
  z-index: 0;
`;

const FristWave = styled.div`
  position: absolute;
  border-radius: 40%;
  background-color: white;
  opacity: 0.04;
  top: 70%;
  animation: ${rotateAnimation} 50s linear infinite;

  @media screen and (max-width: 640px) {
    right: -170%;
    width: 2000px;
    height: 2000px;
  }

  @media screen and (min-width: 641px) {
    right: -90%;
    width: 1000px;
    height: 1000px;
  }
`;

const SecoundWave = styled.div`
  position: absolute;
  border-radius: 40%;
  background-color: white;
  opacity: 0.04;
  top: 70%;
  animation: ${rotateAnimation} 50s linear infinite;
  top: 72%;
  animation: ${rotateAnimation} 30s linear infinite;

  @media screen and (max-width: 640px) {
    right: -170%;
    width: 2000px;
    height: 2000px;
  }

  @media screen and (min-width: 641px) {
    right: -90%;
    width: 1000px;
    height: 1000px;
  }
`;

const ThirdWave = styled.div`
  position: absolute;
  border-radius: 40%;
  background-color: white;
  opacity: 0.04;
  top: 70%;
  animation: ${rotateAnimation} 50s linear infinite;
  top: 80%;
  animation: ${rotateAnimation} 60s linear infinite;

  @media screen and (max-width: 640px) {
    right: -170%;
    width: 2000px;
    height: 2000px;
  }

  @media screen and (min-width: 641px) {
    right: -90%;
    width: 1000px;
    height: 1000px;
  }
`;
