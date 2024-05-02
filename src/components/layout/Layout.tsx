import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import styled from 'styled-components';
import Footer from './Footer';
import WaveBackGround from './WaveBackGround';
import StarBackGround from './StarBackGround';
import SendMyWorry from '../../pages/SendContent/SendMyWorry';
import Header from './Header';
import RankingModal from '../../pages/Ranking/RankingModal';
import StateModal from '../modal/StateModal';
import character from '@/character_star.svg';
import byeolgom_logo from '@/byeolgom_logo.gif';
import { useStateModalStore } from '../../store/stateModalStore';

function Layout() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFooter, setShowFooter] = useState(true);
  const { modalOpen } = useStateModalStore();

  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  const handleOpenModal = (): void => {
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  const showHeader: boolean =
    location.pathname === '/' || location.pathname === 'login';

  useEffect(() => {
    setShowFooter(!location.pathname.startsWith('/chatlist/'));
  }, [location.pathname]);

  return (
    <MainLayout>
      <MainContent>
        <LogoImg src={byeolgom_logo} />
        <Text>말할 수 없는 고민이 있는 현대인들을 위한</Text>
        <div>
          <SpanText>1:1 익명 고민공유</SpanText>
          <Text>웹사이트</Text>
        </div>
        <img src={character} alt="character" />
      </MainContent>
      <MainWrap>
        {showHeader && <Header />}
        {showModal && <SendMyWorry closeModal={handleCloseModal} />}
        {modalOpen && <StateModal />}
        {isLoggedIn && showFooter && <Footer openModal={handleOpenModal} />}
        <RankingModal />
        <div>
          <StarBackGround />
          <WaveBackGround />
        </div>
        <Outlet />
      </MainWrap>
    </MainLayout>
  );
}

export default Layout;
const Text = styled.span`
  color: white;
  padding: 3px;
`;

const SpanText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #e88439;
`;
const MainLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 300px;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 568px;

  img {
    margin: auto;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const MainWrap = styled.div`
  position: relative;
  overflow: auto;
  border-radius: 10px;
  width: 380px;
  height: 720px;
  min-width: 380px;
  background-image: ${({ theme }) => theme.bgImage};
  background-size: cover;
  overflow: hidden;
  z-index: 0;
  @media (max-width: 640px) {
    width: 100vw;
    height: 100vh;
  }
`;

const LogoImg = styled.img`
  width: 200px;
  margin: auto;
`;
