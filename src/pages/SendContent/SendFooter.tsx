import { useState } from 'react';
import textchange from '/assets/textchange.svg';
import {
  BottomContainer,
  TextColorButton,
  ColorButtonContainer,
  ColorSelectButton,
} from '../../components/modal/ContentStyle';

interface SendContentProps {
  SelectedColor: string;
}

function SendContents({ SelectedColor }: SendContentProps) {
  const [fontColor, setFontColor] = useState<string>('#EEEEEE');
  const [showColorButtons, setShowColorButtons] = useState<boolean>(false);

  const colors = ['#EEEEEE', 'red', 'yellow', 'blue'];

  const handleColorChange = (color: string) => {
    setFontColor(color);
  };

  return (
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
  );
}

export default SendContents;
