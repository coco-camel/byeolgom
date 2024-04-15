import { memo, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import rocketA from '/assets/images/rocketA.svg';
import rocketB from '/assets/images/rocketB.svg';
import rocketC from '/assets/images/rocketC.svg';
import ellipse from '/assets/images/ellipse.svg';
import { PostArrivedItem } from '../../types/PostArrivedItem.interface';

interface AnimationProps {
  $sec: number;
  $startAngle: number;
}
interface PostArrivedListProps {
  postArrivedList: PostArrivedItem[];
  onClick: (item: PostArrivedItem) => Promise<void>;
}

const PostArrivedList = memo(
  ({ postArrivedList, onClick }: PostArrivedListProps) => {
    const rocket: { [key: string]: string } = {
      rocketA: rocketA,
      rocketB: rocketB,
      rocketC: rocketC,
    };

    const [animationProps, setAnimationProps] = useState<AnimationProps[]>(() =>
      postArrivedList.map(() => ({
        $sec: Math.floor(Math.random() * (50 - 25 + 1)) + 25,
        $startAngle: Math.floor(Math.random() * 360) + 1,
      })),
    );

    useEffect(() => {
      setAnimationProps((prevAnimationProps) =>
        postArrivedList.map(
          (_, index) =>
            prevAnimationProps[index] || {
              $sec: Math.floor(Math.random() * (50 - 25 + 1)) + 25,
              $startAngle: Math.floor(Math.random() * 360) + 1,
            },
        ),
      );
    }, [postArrivedList]);

    return (
      <>
        {postArrivedList.map((item: PostArrivedItem, index: number) => (
          <button key={index} onClick={() => onClick(item)}>
            <TestDiv>
              <Animation {...animationProps[index]}>
                <ImageContainer>
                  <img
                    src={rocket[`rocket${item.icon}`]}
                    width={24}
                    height={29}
                  />
                  {item.unRead && <EllipseImage src={ellipse} />}
                </ImageContainer>
              </Animation>
            </TestDiv>
          </button>
        ))}
      </>
    );
  },
);

export default PostArrivedList;

const EllipseImage = styled.img`
  position: absolute;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  :nth-child(1) {
    z-index: 9;
  }
`;

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
  z-index: 100;
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
`;
