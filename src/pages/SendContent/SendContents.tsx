import { useState } from 'react';
import styled from 'styled-components';
import { sendContent } from '../../api/sendContentApi';

function SendContents() {
  const [content, setContent] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [userId, setUserId] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fontColor, setFontColor] = useState<string>('black');

  const colors = ['black', 'red', 'blue', 'green'];

  const handleIconClick = (selectedIcon: string) => {
    setIcon(selectedIcon);
    setSelectedIcon(selectedIcon);
  };

  const handleColorChange = (color: string) => {
    setFontColor(color);
  };

  const handleContentSubmit = async () => {
    try {
      const contentData = { content, icon, userId, fontColor };
      const response = await sendContent(contentData);
      console.log(response);
      setContent('');
      setIcon('');
      setSelectedIcon('');
      setUserId(1);
      setShowModal(!showModal);
      setFontColor('black');
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick={handleModalToggle}>아이콘 선택</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {['A', 'B', 'C'].map((icon) => (
              <button
                key={icon}
                style={{
                  border: selectedIcon === icon ? '2px solid blue' : 'none',
                }}
                onClick={() => handleIconClick(icon)}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      )}
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
    </div>
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
