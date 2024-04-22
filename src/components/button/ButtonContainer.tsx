import styled from 'styled-components';

interface StyledButtonProps {
  $width?: string;
  $backColor: string;
}

function ButtonContainer({
  buttons,
  width,
  backColor,
  color,
  onClickHandlers,
}: {
  buttons: string[];
  width: string[];
  backColor: string[];
  color: string[];
  onClickHandlers: ((
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void)[];
}) {
  return (
    <>
      <ButtonWrapper>
        {buttons.map((text, index) => (
          <StyledButton
            key={index}
            $width={width[index]}
            $backColor={backColor[index]}
            color={color[index]}
            onClick={onClickHandlers[index]}
          >
            {text}
          </StyledButton>
        ))}
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

const StyledButton = styled.button<StyledButtonProps>`
  width: ${(props) => props.$width || '100px'};
  height: 35px;
  background-color: ${(props) => props.$backColor || '#B5B5BD'};
  color: ${(props) => props.color || '#black'};
  border-radius: 20px;
`;
