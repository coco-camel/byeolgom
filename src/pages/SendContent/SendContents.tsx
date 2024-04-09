import { useState, useEffect } from 'react';
import styled from 'styled-components';
import textchange from '/assets/textchange.svg';

interface SendContentProps {
  onSend: (content: string, fontColor: string) => void;
}

function SendContents({ onSend }: SendContentProps) {
  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('#EEEEEE');
  const [showColorButtons, setShowColorButtons] = useState<boolean>(false);

  const colors = ['#EEEEEE', 'red', 'yellow', 'blue'];

  const handleColorChange = (color: string) => {
    setFontColor(color);
    setShowColorButtons(false);
  };

  useEffect(() => {
    onSend(content, fontColor);
  }, [content, fontColor, onSend]);

  const currentDate = new Date().toLocaleString();

  return (
    <>
      <DateText>{currentDate}</DateText>
      <StyledInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`어떤 고민이 있나요?\n자유롭게 입력해보세요.`}
        style={{ color: fontColor }}
      />
      <div>
        <TextColorButton
          src={textchange}
          onClick={() => setShowColorButtons(!showColorButtons)}
        />
        {showColorButtons && (
          <ColorButtonContainer>
            {colors.map((color) => (
              <ColorSelectButton
                key={color}
                selected={fontColor === color}
                color={color}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </ColorButtonContainer>
        )}
      </div>
    </>
  );
}

export default SendContents;

const DateText = styled.div`
  margin-top: 60px;
  font-size: 12px;
  color: '#EEEEEE';
`;

const StyledInput = styled.textarea`
  margin-top: 70px;
  width: 70%;
  height: 280px;
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

const TextColorButton = styled.img`
  position: absolute;
  left: 0;
  margin-top: 10px;
  margin-left: 20px;
  width: 24px;
  z-index: 1;
  cursor: pointer;
`;

const ColorButtonContainer = styled.div`
  position: absolute;
  top: 325px;
  left: 0;
  margin-left: 19px;
  width: 25px;
  height: 136px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #b5b5bd66;
  border-radius: 20px;
`;

const ColorSelectButton = styled.button<{ selected: boolean; color: string }>`
  width: 20px;
  height: 20px;
  margin-top: 6px;
  border-radius: 25px;

  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? '2px solid black' : 'none')};

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
