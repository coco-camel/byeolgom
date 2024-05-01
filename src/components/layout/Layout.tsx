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
        {/* <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div> */}
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

const MainLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 300px;
  height: 100vh;
`;

const MainContent = styled.div`
  width: 320px;
  height: 568px;
  @media (max-width: 640px) {
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
