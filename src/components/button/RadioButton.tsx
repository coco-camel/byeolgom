import styled from 'styled-components';

function RadioButton({
  text = '',
  $isActive,
  onClickHandlers,
}: {
  text?: string;
  $isActive: boolean;
  onClickHandlers?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}) {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClickHandlers && onClickHandlers(event);
  };

  return (
    <StyledRadioButton
      onClick={handleClick}
      className={$isActive ? 'active' : ''}
    >
      <Circle className="Circle" />
      <Text>{text}</Text>
    </StyledRadioButton>
  );
}

export default RadioButton;

const StyledRadioButton = styled.button`
  display: flex;
  align-items: center;
  position: relative;

  &.active .Circle {
    background-color: #e88439;
  }
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 25px;
  border: 2px solid #b5b5bd;
`;

const Text = styled.div`
  color: black;
  font-size: 12px;
  margin-left: 6px;
`;
