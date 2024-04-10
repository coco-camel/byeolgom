import styled, { keyframes } from 'styled-components';
import rocketA from '/assets/rocketA.svg';
import rocketB from '/assets/rocketB.svg';
import rocketC from '/assets/rocketC.svg';
import ellipse from '/assets/ellipse.svg';
import { useEffect, useState } from 'react';
import GetOtherWorry from '../modal/GetOtherWorry';
import { WorryDetail } from '../../types/WorryDetail.interface';
import {
  postArrived,
  getWorryDetail,
  getCommentDetail,
} from '../../api/postArrived';

interface AnimationProps {
  $sec: number;
  $startAngle: number;
}

interface PostArrivedItem {
  commentId: number;
  icon: string;
  worryId: number;
  unRead: boolean;
}

function PostArrived() {
  const [postArrivedList, setPostArricedList] = useState<PostArrivedItem[]>();
  const [detail, setDetail] = useState<WorryDetail>({} as WorryDetail);
  const [showModal, setShowModal] = useState<boolean>(false);

  const rocket: { [key: string]: string } = {
    rocketA: rocketA,
    rocketB: rocketB,
    rocketC: rocketC,
  };

  useEffect(() => {
    postArrived().then((res) => {
      setPostArricedList(res);
    });
    const interval = setInterval(() => {
      postArrived().then((res) => {
        setPostArricedList(res);
      });
    }, 1000 * 20);
    return () => clearInterval(interval);
  }, []);

  const handleClick = async (itemId: number, key: 'worryId' | 'commentId') => {
    try {
      if (key === 'worryId') {
        const detail = await getWorryDetail({ worryid: itemId });
        setDetail(detail);
        setShowModal(true);
      } else if (key === 'commentId') {
        const detail = await getCommentDetail({ commentid: itemId });
        setDetail(detail);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {postArrivedList &&
        postArrivedList.map((item) => (
          <button
            key={item.worryId}
            onClick={() =>
              handleClick(
                item.commentId || item.worryId,
                item.commentId !== null ? 'commentId' : 'worryId',
              )
            }
          >
            <TestDiv>
              <Animation
                $sec={Math.floor(Math.random() * (50 - 25 + 1)) + 25}
                $startAngle={Math.floor(Math.random() * 360) + 1}
              >
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
      {showModal && (
        <DetailContainer>
          <GetOtherWorry detail={detail} closeModal={handleCloseModal} />
        </DetailContainer>
      )}
    </>
  );
}

export default PostArrived;

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

  @media (max-width: 640px) {
    animation: ${(props) => animation(props.$startAngle, '220px')}
      ${(props) => props.$sec}s infinite linear;
  }
  @media (max-width: 480px) {
    animation: ${(props) => animation(props.$startAngle, '150px')}
      ${(props) => props.$sec}s infinite linear;
  }
`;

const DetailContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;
