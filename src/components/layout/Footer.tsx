import { useState, useEffect } from 'react';
import styled from 'styled-components';
import locker from '@/locker.svg';
import hoverLocker from '@/hoverLocker.svg';
import home from '@/home.svg';
import hoverHome from '@/hoverHome.svg';
import rocketA from '@/rocketA.svg';
import setting from '@/setting.svg';
import hoverSetting from '@/hoverSetting.svg';
import chat from '@/chat.svg';
import hoverChat from '@/hoverChat.svg';
import { Link } from 'react-router-dom';
import { useWorryCountStore } from '../../store/worryCountStore';
import { useStateModalStore } from '../../store/stateModalStore';

function Footer({ openModal }: { openModal: () => void }) {
  const [clickedButton, setClickedButton] = useState<string>('');
  const { worryCount } = useWorryCountStore();
  const { openStateModal } = useStateModalStore();

  useEffect(() => {
    setClickedButton('home');
  }, []);

  const handleButtonClick = (buttonName: string) => {
    if (clickedButton === buttonName) return;
    setClickedButton(buttonName);
    if (buttonName === 'chat') {
      alert('아직 개발 중인 기능입니다.');
    }
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
        <HoverableImage
          src={clickedButton === 'chat' ? hoverChat : chat}
          onClick={() => handleButtonClick('chat')}
        />
        <Link to={'/mypage'}>
          <HoverableImage
            src={clickedButton === 'setting' ? hoverSetting : setting}
            onClick={() => handleButtonClick('setting')}
          />
        </Link>
        <Sendwrap>
          <StyledImg
            src={rocketA}
            onClick={() =>
              worryCount === 0
                ? openStateModal('보낼 수 있는 로켓이 없어요', true)
                : openModal()
            }
          />
        </Sendwrap>
      </FooterInner>
    </FooterArea>
  );
}

export default Footer;

const Sendwrap = styled.div`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
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
  background: ${({ theme }) => theme.footerArea};
`;

const HoverableImage = styled.img`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.15);
  }
`;

const StyledImg = styled.img`
  width: 55px;
  cursor: pointer;
`;
