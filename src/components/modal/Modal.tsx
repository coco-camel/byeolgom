import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import rocketA from '/assets/rocketA.svg';
import rocketB from '/assets/rocketB.svg';
import rocketC from '/assets/rocketC.svg';
import SendContents from '../../pages/SendContent/SendContents';

const slideIn = keyframes`
  from {
    bottom: -900px;
  }

  to {
    bottom: 0;
  }
`;

interface RocketButtonProps {
  $isLast?: boolean;
}

function Modal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    setShowModal(false);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const getRocketImage = (icon: string) => {
    switch (icon) {
      case 'A':
        return rocketA;
      case 'B':
        return rocketB;
      case 'C':
        return rocketC;
      default:
        return rocketB;
    }
  };

  return (
    <AnimatedWrapper>
      <StyledImg
        src={getRocketImage(selectedIcon)}
        onClick={handleModalToggle}
      />
      {showModal && (
        <ModalBox>
          <div>
            <RocketButton onClick={() => handleIconClick('A')} src={rocketA} />
            <RocketButton onClick={() => handleIconClick('B')} src={rocketB} />
            <RocketButton
              onClick={() => handleIconClick('C')}
              src={rocketC}
              $isLast
            />
          </div>
        </ModalBox>
      )}
      <WhiteBox>
        <SendContents selectedIcon={selectedIcon} />
      </WhiteBox>
    </AnimatedWrapper>
  );
}

export default Modal;

const AnimatedWrapper = styled.div`
  position: relative;
  z-index: 200;
  animation: ${slideIn} 0.3s ease-in-out;
`;

const StyledImg = styled.img`
  position: absolute;
  z-index: 1;
  left: 50%;
  margin-top: 70px;
  transform: translate(-50%, -50%);
`;

const WhiteBox = styled.div`
  position: absolute;
  width: 100%;
  height: 2000px;
  margin-top: 70px;
  border-radius: 15px;
  background-color: white;
`;

const ModalBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 150px;
  width: 250px;
  height: 80px;
  background-color: #00000045;
  border-radius: 15px;
`;

const RocketButton = styled.img<RocketButtonProps>`
  cursor: pointer;
  ${({ $isLast }) => !$isLast && 'margin-right: 10px;'}
`;
