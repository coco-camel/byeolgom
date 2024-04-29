import { useState, useEffect } from 'react';
import styled from 'styled-components';
import rocketA from '@/rocketA.svg';
import Home from '@/home.svg?react';
import HoverHome from '@/hoverHome.svg?react';
import Locker from '@/locker.svg?react';
import HoverLocker from '@/hoverLocker.svg?react';
import Chat from '@/chat.svg?react';
import HoverChat from '@/hoverChat.svg?react';
import Setting from '@/setting.svg?react';
import HoverSetting from '@/hoverSetting.svg?react';
import { Link } from 'react-router-dom';
import { useWorryCountStore } from '../../store/worryCountStore';
import { useStateModalStore } from '../../store/stateModalStore';
import { useThemeStore } from '../../store/themeStore';
import { useUserState } from '../../hooks/queries/useUserState.ts';
import { userStateStore } from '../../store/userStateStore.ts';
import { useShallow } from 'zustand/react/shallow';

function Footer({ openModal }: { openModal: () => void }) {
  const [clickedButton, setClickedButton] = useState<string>('');
  const { worryCount } = useWorryCountStore();
  const { openStateModal } = useStateModalStore();
  const [isDarkMode, setTheme] = useThemeStore(
    useShallow((state) => [state.isDarkMode, state.setTheme]),
  );

  const setUsersState = userStateStore((state) => state.setUsersState);
  const userStateQuery = useUserState();

  useEffect(() => {
    if (userStateQuery.data) {
      setUsersState(userStateQuery.data.planet);
      setTheme(userStateQuery.data.darkMode);
    }
  }, [userStateQuery.data, setUsersState, setTheme]);

  useEffect(() => {
    setClickedButton('home');
  }, []);

  const handleButtonClick = (buttonName: string) => {
    if (clickedButton === buttonName) return;
    setClickedButton(buttonName);
  };

  const theme = isDarkMode ? '#eee' : '#000239';

  return (
    <FooterArea>
      <FooterInner>
        <Link to={'/'}>
          {clickedButton !== 'home' && (
            <Home fill={theme} onClick={() => handleButtonClick('home')} />
          )}
          {clickedButton === 'home' && (
            <HoverHome fill={theme} onClick={() => handleButtonClick('home')} />
          )}
        </Link>
        <Link to={'/pastcontents'}>
          {clickedButton !== 'locker' && (
            <Locker fill={theme} onClick={() => handleButtonClick('locker')} />
          )}
          {clickedButton === 'locker' && (
            <HoverLocker
              fill={theme}
              onClick={() => handleButtonClick('locker')}
            />
          )}
        </Link>
        <div></div>
        <Link to={'/chatlist'}>
          {clickedButton !== 'chat' && (
            <Chat fill={theme} onClick={() => handleButtonClick('chat')} />
          )}
          {clickedButton === 'chat' && (
            <HoverChat fill={theme} onClick={() => handleButtonClick('chat')} />
          )}
        </Link>
        <Link to={'/mypage'}>
          {clickedButton !== 'setting' && (
            <Setting
              fill={theme}
              onClick={() => handleButtonClick('setting')}
            />
          )}
          {clickedButton === 'setting' && (
            <HoverSetting
              fill={theme}
              onClick={() => handleButtonClick('setting')}
            />
          )}
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

const StyledImg = styled.img`
  width: 55px;
  cursor: pointer;
`;
