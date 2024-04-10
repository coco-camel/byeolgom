import { useState, useEffect } from 'react';
import textchange from '/assets/textchange.svg';
import {
  SendContainer,
  StyledInput,
  BottomContainer,
  TextColorButton,
  ColorButtonContainer,
  ColorSelectButton,
} from '../../components/modal/ContentStyle';

interface SendContentProps {
  onSend: (content: string, fontColor: string) => void;
  placeholder?: string;
  containerHeight?: string;
}

function SendContents({
  onSend,
  placeholder = '',
  containerHeight = '200px',
}: SendContentProps) {
  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('#EEEEEE');
  const [showColorButtons, setShowColorButtons] = useState<boolean>(false);

  const colors = ['#EEEEEE', 'red', 'yellow', 'blue'];

  const handleColorChange = (color: string) => {
    setFontColor(color);
  };

  useEffect(() => {
    onSend(content, fontColor);
  }, [content, fontColor, onSend]);

  return (
    <SendContainer height={containerHeight}>
      <StyledInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        style={{ color: fontColor }}
      />
      <BottomContainer>
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
      </BottomContainer>
    </SendContainer>
  );
}

export default SendContents;
