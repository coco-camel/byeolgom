import { useState } from 'react';
import styled from 'styled-components';
import locker from '/assets/locker.svg';
import hoverLocker from '/assets/hoverLocker.svg';
import home from '/assets/home.svg';
import hoverHome from '/assets/hoverHome.svg';
import rocket from '/assets/rocket.svg';
import setting from '/assets/setting.svg';
import hoverSetting from '/assets/hoverSetting.svg';
import chat from '/assets/chat.svg';
import hoverChat from '/assets/hoverChat.svg';
import { Link } from 'react-router-dom';

function Footer() {
  const [hoveredButton, setHoveredButton] = useState<string>('');
  const [clickedButton, setClickedButton] = useState<string>('');

  const handleButtonHover = (buttonName: string) => {
    if (!clickedButton) {
      setHoveredButton(buttonName);
    }
  };

  const handleButtonLeave = () => {
    setHoveredButton('');
  };

  const handleButtonClick = (buttonName: string) => {
    setClickedButton((prevButton) =>
      prevButton === buttonName ? '' : buttonName,
    );
    setHoveredButton(buttonName);
  };

  return (
    <FooterArea>
      <FooterInner>
        <Link to={'/'}>
          <HoverableImage
            src={
              hoveredButton === 'home' || clickedButton === 'home'
                ? hoverHome
                : home
            }
            onMouseEnter={() => handleButtonHover('home')}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick('home')}
          />
        </Link>
        <Link to={'/pastcontents'}>
          <HoverableImage
            src={
              hoveredButton === 'locker' || clickedButton === 'locker'
                ? hoverLocker
                : locker
            }
            onMouseEnter={() => handleButtonHover('locker')}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick('locker')}
          />
        </Link>
        <div></div>
        <Link to={'/'}>
          <HoverableImage
            src={
              hoveredButton === 'chat' || clickedButton === 'chat'
                ? hoverChat
                : chat
            }
            onMouseEnter={() => handleButtonHover('chat')}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick('chat')}
          />
        </Link>
        <Link to={'/mypage'}>
          <HoverableImage
            src={
              hoveredButton === 'setting' || clickedButton === 'setting'
                ? hoverSetting
                : setting
            }
            onMouseEnter={() => handleButtonHover('setting')}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick('setting')}
          />
        </Link>
        <Sendwrap>
          <Link to={'/sendcontents'}>
            <img src={rocket} />
          </Link>
        </Sendwrap>
      </FooterInner>
    </FooterArea>
  );
}

export default Footer;
const Sendwrap = styled.div`
  position: absolute;
  margin-bottom: 50px;
`;

const FooterArea = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
`;
const FooterInner = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  padding: 15px 15px;
  gap: 20px;
  background: #2f4768;
`;

const HoverableImage = styled.img`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
