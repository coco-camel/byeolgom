import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import styled from 'styled-components';
import Footer from './Footer';

const Layout = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <MainLayout>
      <MainContent>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
        <div>설명~~~</div>
      </MainContent>
      <MainWrap>
        <Outlet />
        {isLoggedIn && <Footer />}
      </MainWrap>
    </MainLayout>
  );
};

export default Layout;

const MainLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 200px;
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
  padding: 20px;
  width: 320px;
  min-width: 320px;
  min-height: 568px;
  background-color: #2f364f;
  @media (max-width: 640px) {
    width: 100vw;
    height: 100vh;
  }
`;
