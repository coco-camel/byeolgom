import { useState, useEffect } from 'react';
import styled from 'styled-components';
import locker from '/assets/locker.svg';
import hoverLocker from '/assets/hoverLocker.svg';
import home from '/assets/home.svg';
import hoverHome from '/assets/hoverHome.svg';
import rocketB from '/assets/rocketB.svg';
import setting from '/assets/setting.svg';
import hoverSetting from '/assets/hoverSetting.svg';
import chat from '/assets/chat.svg';
import hoverChat from '/assets/hoverChat.svg';
import { Link } from 'react-router-dom';

function Footer({ openModal }: { openModal: () => void }) {
  const [clickedButton, setClickedButton] = useState<string>('');

  useEffect(() => {
    setClickedButton('home');
  }, []);

  const handleButtonClick = (buttonName: string) => {
    if (clickedButton === buttonName) return;
    setClickedButton(buttonName);
  };

  return (
    <FooterArea>
      <FooterInner>
        <Link to={'/'}>
          <HoverableImage
            src={clickedButton === 'home' ? hoverHome : home}
            onClick={() => handleButtonClick('home')}
          />
        </Link>
        <Link to={'/pastcontents'}>
          <HoverableImage
            src={clickedButton === 'locker' ? hoverLocker : locker}
            onClick={() => handleButtonClick('locker')}
          />
        </Link>
        <div></div>
        <Link to={'/'}>
          <HoverableImage
            src={clickedButton === 'chat' ? hoverChat : chat}
            onClick={() => handleButtonClick('chat')}
          />
        </Link>
        <Link to={'/mypage'}>
          <HoverableImage
            src={clickedButton === 'setting' ? hoverSetting : setting}
            onClick={() => handleButtonClick('setting')}
          />
        </Link>
        <Sendwrap>
          <img src={rocketB} onClick={openModal} />
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
    transform: scale(1.15);
  }
`;
