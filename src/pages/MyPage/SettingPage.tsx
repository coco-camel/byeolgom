import { useEffect, useState } from 'react';
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

  const handleNicknameChange = () => {
    alert('개발 중인 기능입니다!');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <SettingContainer>
      <Header>설정</Header>
      <Content>
        <ProfileSection>
          <ProfilePic />
          <NicknameAndChange>
            <Nickname>익명의 7564</Nickname>
            <ChangeArrow onClick={handleNicknameChange} />
          </NicknameAndChange>
        </ProfileSection>
        <Theme>
          <p>테마</p>
          <DarkModeSwitch>
            <p>다크모드</p>
            <ToggleSwitch />
          </DarkModeSwitch>
        </Theme>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Content>
    </SettingContainer>
  );
}

export default SettingPage;

const SettingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const ProfilePic = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 15px;
`;

const NicknameAndChange = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 18px;
  color: white;
`;

const ChangeArrow = styled.div`
  font-size: 18px;
  color: white;
  cursor: pointer;
  &:after {
    content: '>';
  }
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Theme = styled.div`
  width: 100%;
  margin-bottom: 50px;

  p {
    color: gray;
    font-weight: 300;
  }
`;

const DarkModeSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;

  p {
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
  }

  // 다크모드 활성화 되면 작동하는 스타일
  &.active:after {
    left: 22px;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 15px;
  color: grey;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  margin-top: 100px;
`;
