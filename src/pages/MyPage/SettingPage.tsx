import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getUserName } from '../../api/nickName';

function SettingPage() {
  const navigate = useNavigate();
  const { setLogoutState } = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [nickname, setNickname] = useState('익명');

  const handleLogout = () => {
    localStorage.removeItem('access_Token');
    localStorage.removeItem('refresh_Token');
    setLogoutState();
    navigate('/login');
  };

  const handleNicknameChange = () => {
    navigate('/changenickname');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      getUserName()
        .then((response) => {
          setNickname(response.nickname);
        })
        .catch((error) => {
          console.error('유저 정보가 없습니다', error);
          setNickname('익명');
        });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <MyPageHeader>
        <h1>설정</h1>
      </MyPageHeader>
      <SettingContainer>
        <Content>
          <Wrapper>
            <ProfileSection>
              <ProfilePic />
              <NicknameAndChange>
                <Nickname>{nickname}</Nickname>
                <ChangeArrow onClick={handleNicknameChange} />
              </NicknameAndChange>
            </ProfileSection>
            <Theme>
              <p>테마</p>
              <DarkModeSwitch
                onClick={toggleDarkMode}
                className={isDarkMode ? 'active' : ''}
              >
                <p>다크모드</p>
                <ToggleSwitch $isDark={isDarkMode} />{' '}
              </DarkModeSwitch>
            </Theme>
          </Wrapper>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </Content>
      </SettingContainer>
    </>
  );
}

export default SettingPage;

const Wrapper = styled.div`
  width: 100%;
`;

const SettingContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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

const MyPageHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 16px;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const ToggleSwitch = styled.div<{ $isDark: boolean }>`
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  ${(props) =>
    props.$isDark &&
    css`
      background-color: #abcd53;
      box-shadow: 0 0 5px 0 #abcd53;
    `}

  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;

    ${(props) =>
      props.$isDark &&
      css`
        left: 30px;
      `}
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 15px;
  color: lightgrey;
  cursor: pointer;
  border: none;
  border-radius: 10px;
`;
