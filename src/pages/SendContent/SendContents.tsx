import { useState } from 'react';
import styled from 'styled-components';
import { sendContent } from '../../api/sendContentApi';

interface SendContentsProps {
  selectedIcon: string;
}

function SendContents({ selectedIcon }: SendContentsProps) {
  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('black');

  const colors = ['black', 'red', 'blue', 'green'];

  const handleColorChange = (color: string) => {
    setFontColor(color);
  };

  const handleContentSubmit = async () => {
    try {
      const contentData = { content, icon: selectedIcon, fontColor };
      const response = await sendContent(contentData);
      console.log(response);
      setContent('');
      setFontColor('black');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        style={{ color: fontColor }}
      />
      <div>
        {colors.map((color) => (
          <ColorSelectButton
            key={color}
            selected={fontColor === color}
            color={color}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>
      <button onClick={handleContentSubmit}>Send Content</button>
    </>
  );
}

export default SendContents;

const ColorSelectButton = styled.button<{ selected: boolean; color: string }>`
  width: 25px;
  height: 25px;
  border-radius: 25px;

  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? '2px solid blue' : 'none')};

  &:hover {
    background-color: ${(props) =>
      props.color === 'red'
        ? '#d20000'
        : props.color === 'blue'
          ? '#0000db'
          : props.color === 'green'
            ? '#006b00'
            : props.color};
  }
`;
