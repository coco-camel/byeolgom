import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
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
  width: 100%;
  height: 100%;
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
  height: 100%;
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

export const SendContainer = styled.div<{ height?: string }>`
  width: 100%;
  height: ${(props) => props.height || '75%'};
  display: flex;
  align-content: center;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 641px) {
    height: ${(props) => props.height || '85%'};
  }
`;

export const StyledInput = styled.textarea`
  margin-top: 40px;
  width: 70%;
  height: 30%;
  font-size: 16px;
  text-align: center;
  color: '#EEEEEE';
  background-color: transparent;
  overflow: auto;
  white-space: pre-line;
  resize: none;
  border: none;
  outline: none;
`;

export const BottomContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 10px;
  display: flex;
`;

export const TextColorButton = styled.img`
  width: 24px;
  z-index: 5;
  margin-left: 10px;
  top: 0;
  cursor: pointer;
`;

export const ColorButtonContainer = styled.div`
  position: absolute;
  width: 25px;
  height: 136px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #b5b5bd66;
  border-radius: 20px;
  margin-left: 9px;
  top: -101px;
`;

export const ColorSelectButton = styled.button<{
  selected: boolean;
  color: string;
}>`
  width: 20px;
  height: 20px;
  margin-top: 6px;
  border-radius: 25px;

  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? '1px solid #1E2734' : 'none')};

  &:hover {
    background-color: ${(props) =>
      props.color === 'red'
        ? '#d20000'
        : props.color === 'yellow'
          ? '#dbc900'
          : props.color === 'blue'
            ? '#0012b8'
            : props.color};
  }
`;

export const DummyBox = styled.div`
  height: 50px;
`;
