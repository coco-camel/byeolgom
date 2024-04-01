import { useState } from 'react';
import styled, { css } from 'styled-components';
import { sendContent } from '../../api/sendContentApi';

interface ColorSelectButtonProps {
  Black?: boolean;
  Red?: boolean;
  Blue?: boolean;
  Green?: boolean;
}

function SendContents() {
  const [content, setContent] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [userId, setUserId] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fontColor, setFontColor] = useState<string>('black');

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
            <button
              style={{
                border: selectedIcon === 'A' ? '2px solid blue' : 'none',
              }}
              onClick={() => handleIconClick('A')}
            >
              A
            </button>
            <button
              style={{
                border: selectedIcon === 'B' ? '2px solid blue' : 'none',
              }}
              onClick={() => handleIconClick('B')}
            >
              B
            </button>
            <button
              style={{
                border: selectedIcon === 'C' ? '2px solid blue' : 'none',
              }}
              onClick={() => handleIconClick('C')}
            >
              C
            </button>
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
        <ColorSelectButton
          style={{
            border: fontColor === 'black' ? '2px solid blue' : 'none',
          }}
          Black
          onClick={() => handleColorChange('black')}
        />
        <ColorSelectButton
          style={{
            border: fontColor === 'red' ? '2px solid blue' : 'none',
          }}
          Red
          onClick={() => handleColorChange('red')}
        />
        <ColorSelectButton
          style={{
            border: fontColor === 'blue' ? '2px solid blue' : 'none',
          }}
          Blue
          onClick={() => handleColorChange('blue')}
        />
        <ColorSelectButton
          style={{
            border: fontColor === 'green' ? '2px solid blue' : 'none',
          }}
          Green
          onClick={() => handleColorChange('green')}
        />
      </div>
      <button onClick={handleContentSubmit}>Send Content</button>
    </div>
  );
}

export default SendContents;

const ColorSelectButton = styled.button<ColorSelectButtonProps>`
  width: 25px;
  height: 25px;
  border-radius: 25px;

  ${(props) =>
    props.Black &&
    css`
      background-color: black;
      &:hover {
        background-color: black;
      }
    `}

  ${(props) =>
    props.Red &&
    css`
      background-color: red;
      &:hover {
        background-color: #d20000;
      }
    `}

    ${(props) =>
    props.Blue &&
    css`
      background-color: blue;
      &:hover {
        background-color: #0000db;
      }
    `}

    ${(props) =>
    props.Green &&
    css`
      background-color: green;
      &:hover {
        background-color: #006b00;
      }
    `}
`;
