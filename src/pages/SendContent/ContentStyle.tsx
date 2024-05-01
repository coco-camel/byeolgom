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
  .backButton {
    margin-left: 20px;
    margin-top: 15px;
    cursor: pointer;
  }
`;

export const SendButton = styled.button`
  padding: 4px 8px;
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
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const WhiteBox = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.ModalBox};
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
  background-color: ${({ theme }) => theme.ModalOverlay};
  z-index: 150;
`;

export const RocketButton = styled.img<RocketButtonProps>`
  cursor: pointer;
  width: ${({ $isLast }) => ($isLast ? '45px' : '55px')};
  ${({ $isLast }) => !$isLast && 'margin-right: 20px;'};
`;

export const SendContainer = styled.div<{ height?: string }>`
  position: relative;
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
  margin-top: 30px;
  width: 80%;
  height: 75%;
  font-size: 16px;
  text-align: center;
  background-color: transparent;
  overflow: auto;
  white-space: pre-line;
  resize: none;
  border: none;
  outline: none;
`;

export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px 20px;
  display: flex;
`;

export const TextColorButton = styled.img`
  width: 24px;
  z-index: 5;
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
  margin-left: -0.5px;
  bottom: 28%;
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

export const DateText = styled.div`
  font-size: 12px;
  margin-top: 65px;
`;

export const ContentText = styled.div<{
  $marginTop?: string;
  $height?: string;
}>`
  font-size: 16px;
  width: 70%;
  height: ${(props) => props.$height || '20%'};
  overflow: hidden;
  text-align: center;
  margin-top: ${(props) => props.$marginTop || '0px'};
  color: ${(props) => props.color || '#FFFFFF'};
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 15%;
`;

export const TakeStarImg = styled.div`
  position: absolute;
  margin-top: -90px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 12px;
    position: absolute;
  }
`;

export const LineContainer = styled.div<{ $marginTop?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 30px;
  margin-top: ${(props) => props.$marginTop || '0px'};
`;

export const ReplyButton = styled.button`
  width: 145px;
  height: 35px;
  font-size: 12px;
  color: #2a2a2a;
  left: 50%;
  background-color: #eeeeee;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #e88439;
  }
`;

export const DeleteImg = styled.img`
  position: absolute;
  width: 24px;
  right: -40%;
  cursor: pointer;
`;

export const ReportImg = styled.img`
  width: 16px;
  margin-right: 25px;
  margin-top: 15px;
  cursor: pointer;
`;

export const StarButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 82%;

  @media screen and (max-width: 641px) {
    top: 71%;
  }
`;

export const StarButton = styled.button`
  display: flex;
  align-items: center;
  position: relative;

  &:hover .HoverImage {
    display: block;
  }

  &.active .Circle {
    background-color: #e88439;
  }
`;

export const HoverImage = styled.img`
  display: none;
  position: absolute;
  top: -400%;
  left: 50%;
  transform: translateX(-50%);

  ${StarButton}:hover & {
    display: block;
  }
`;

export const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 25px;
  border: 2px solid #b5b5bd;
`;

export const StarText = styled.div`
  color: white;
  font-size: 14px;
  margin-left: 6px;
`;
