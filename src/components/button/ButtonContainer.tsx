import styled from 'styled-components';

interface StyledButtonProps {
  $width?: string;
  $color?: string;
  $backColor?: string;
}

function ButtonContainer({
  buttons,
  width,
  backColor = [''],
  color = [''],
  onClickHandlers,
  hasHover = false,
}: {
  buttons: string[];
  width: string[];
  backColor?: string[];
  color?: string[];
  onClickHandlers: ((
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void)[];
  hasHover?: boolean;
}) {
  return (
    <>
      <ButtonWrapper>
        {buttons.map((text, index) =>
          hasHover ? (
            <HoverStyledButton
              key={index}
              $width={width[index]}
              onClick={onClickHandlers[index]}
            >
              {text}
            </HoverStyledButton>
          ) : (
            <StyledButton
              key={index}
              $width={width[index]}
              $color={color[index]}
              $backColor={backColor[index]}
              onClick={onClickHandlers[index]}
            >
              {text}
            </StyledButton>
          ),
        )}
      </ButtonWrapper>
    </>
  );
}

export default ButtonContainer;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 10px;
  gap: 6px;
`;

export const HoverStyledButton = styled.button<StyledButtonProps>`
  width: ${(props) => props.$width || '100px'};
  height: 35px;
  background-color: #b5b5bd;
  color: #000000;
  border-radius: 20px;

  &:hover {
    background-color: #e88439;
    color: #eeeeee;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${(props) => props.$width || '100px'};
  height: 35px;
  background-color: ${(props) => props.$backColor || '#B5B5BD'};
  color: ${(props) => props.$color || '#000000'};
  border-radius: 20px;
`;
