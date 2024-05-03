import { useState, useEffect, useRef } from 'react';
import textchange from '@/textchange.svg';
import {
  SendContainer,
  StyledInput,
  BottomContainer,
  TextColorButton,
  ColorButtonContainer,
  ColorSelectButton,
} from './ContentStyle';
import { useThemeStore } from '../../store/themeStore';

interface SendContentProps {
  onSend: (content: string, fontColor: string) => void;
  onInputClick?: () => void;
  placeholder?: string;
  containerHeight?: string;
}

function SendContents({
  onSend,
  onInputClick,
  placeholder = '',
  containerHeight = '33vh',
}: SendContentProps) {
  const { isDarkMode } = useThemeStore();
  const defaultColor = isDarkMode ? '#EEEEEE' : '#000239';

  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>(defaultColor);
  const [showColorButtons, setShowColorButtons] = useState<boolean>(false);

  const colors = [defaultColor, '#E88439', '#FFE45E', '#4C76B0'];
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 350);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleColorChange = (color: string) => {
    setFontColor(color);
  };

  useEffect(() => {
    onSend(content, fontColor);
  }, [content, fontColor, onSend]);

  return (
    <SendContainer height={containerHeight}>
      <StyledInput
        ref={inputRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onClick={onInputClick}
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
