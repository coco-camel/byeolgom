import styled, { keyframes } from 'styled-components';
import image30 from '/assets/image30.svg';
interface AnimationProps {
  $sec: number;
  $startAngle: number;
}

function PastContentAnimation() {
  return (
    <>
      <TestDiv>
        <Animation $sec={15} $startAngle={0}>
          <img src={image30} width={30} height={30} />
        </Animation>
        <Animation $sec={12} $startAngle={120}>
          <img src={image30} width={30} height={30} />
        </Animation>
        <Animation $sec={37} $startAngle={70}>
          <img src={image30} width={30} height={30} />
        </Animation>
      </TestDiv>
    </>
  );
}

export default PastContentAnimation;

const TestDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  max-height: 300px;
  z-index: 999;
`;

const animation = ($startAngle: number, $translateX: string) => keyframes`
  0% {
    transform: rotate(${$startAngle}deg) translateX(${$translateX}) rotate(180deg);
  }
  100% {
    transform: rotate(${$startAngle + 360}deg) translateX(${$translateX}) rotate(180deg);
  }
`;

const Animation = styled.div<AnimationProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  animation: ${(props) => animation(props.$startAngle, '150px')}
    ${(props) => props.$sec}s infinite linear;
  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 640px) {
    animation: ${(props) => animation(props.$startAngle, '220px')}
      ${(props) => props.$sec}s infinite linear;
  }
  @media (max-width: 480px) {
    animation: ${(props) => animation(props.$startAngle, '150px')}
      ${(props) => props.$sec}s infinite linear;
  }
`;
