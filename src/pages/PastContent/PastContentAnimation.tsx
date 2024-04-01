import styled, { keyframes } from 'styled-components';
import image30 from '../../../public/assets/image30.svg';
interface AnimationProps {
  $sec: number;
  $startAngle: number;
}

function PastContentAnimation() {
  return (
    <>
      <TestDiv>
        <Animation $sec={15} $startAngle={0}>
          <img src={image30} />
        </Animation>
        <Animation $sec={26} $startAngle={120}>
          <img src={image30} />
        </Animation>
        <Animation $sec={37} $startAngle={240}>
          <img src={image30} />
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const animation = ($startAngle: number) => keyframes`
  0% {
    transform: rotate(${$startAngle}deg) translateX(300px) rotate(180deg);
  }
  100% {
    transform: rotate(${$startAngle + 360}deg) translateX(300px) rotate(180deg);
  }
`;

const Animation = styled.div<AnimationProps>`
  width: 20px;
  height: 20px;
  background-color: #26206c;
  animation: ${(props) => animation(props.$startAngle)}
    ${(props) => props.$sec}s infinite linear;
  &:hover {
    animation-play-state: paused;
  }
`;
