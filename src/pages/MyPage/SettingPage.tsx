import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

function SettingPage() {
  const navigate = useNavigate();
  const { setLogoutState } = useAuthStore();
  const { isLoggedIn } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('access_Token');
    localStorage.removeItem('refresh_Token');
    setLogoutState();
    navigate('/login');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <SettingContainer>
      <Button onClick={handleLogout}>로그아웃</Button>
    </SettingContainer>
  );
}

export default SettingPage;

const SettingContainer = styled.div`
  display: flex;
  justify-content: center;
  color: white;
`;

const Button = styled.button`
  border: none;
  font-size: 15px;
  color: white;
  margin-top: 80%;
  cursor: pointer;
  background: transparent;
`;
