import styled, { keyframes } from 'styled-components';

export const slideIn = keyframes`
  from {
    bottom: -900px;
  }

  to {
    bottom: 0;
  }
`;

export interface RocketButtonProps {
  $isLast?: boolean;
}

export const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  z-index: 300;
  display: flex;
  justify-content: space-between;
`;

export const BackButton = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 15px;
  cursor: pointer;
`;

export const SendButton = styled.button`
  width: 65px;
  height: 24px;
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? '#b9b9b9' : '#ffffff')};
  margin-right: 20px;
  margin-top: 15px;
  background-color: ${({ disabled }) => (disabled ? '#eeeeee' : '#E88439')};
  border-radius: 30px;
`;

export const AnimatedWrapper = styled.div`
  position: relative;
  z-index: 200;
  animation: ${slideIn} 0.3s ease-in-out;
`;

export const StyledImg = styled.img`
  position: absolute;
  z-index: 1;
  left: 50%;
  width: 55px;
  margin-top: 55px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const WhiteBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  margin-top: 50px;
  border-radius: 35px;
  background-color: #1e2734;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ModalBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 55px;
  width: 250px;
  height: 80px;
  background-color: #b5b5bd;
  border-radius: 50px;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2f4768;
  z-index: 150;
`;

export const RocketButton = styled.img<RocketButtonProps>`
  cursor: pointer;
  width: ${({ $isLast }) => ($isLast ? '45px' : '55px')};
  ${({ $isLast }) => !$isLast && 'margin-right: 20px;'};
`;
