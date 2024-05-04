import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useFetchNickName } from '../../hooks/queries/useFetchNickName';
import ChevronRight from '@/chevronRight.svg?react';
import { useThemeStore } from '../../store/themeStore';
import toggleBg from '@/toggleBg.png';
import GOM from '@/GOM.svg';
import { useUpdateThemaMutation } from '../../hooks/mutations/useUpdateThema';
import { useStateModalStore } from '../../store/stateModalStore';
import moon from '@/moon.png';
import sun from '@/sun.png';

function SettingPage() {
  const navigate = useNavigate();
  const { setLogoutState } = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  const { data: NickName, isError, error } = useFetchNickName();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { mutate: UpdateThemaMutate } = useUpdateThemaMutation();
  const openStateModal = useStateModalStore((state) => state.openStateModal);

  if (isError) {
    console.error('닉네임 정보를 불러오는 데 실패했습니다.', error);
  }

  const handleLogout = () => {
    localStorage.removeItem('access_Token');
    localStorage.removeItem('refresh_Token');
    setLogoutState();
    navigate('/login');
  };

  const handleNicknameChange = () => {
    navigate('/changenickname');
  };

  const handleToggleThemeChange = () => {
    UpdateThemaMutate(!isDarkMode, {
      onSuccess: () => {
        toggleTheme();
        openStateModal('테마가 변경되었어요');
      },
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <MyPageHeader>
        <p>설정</p>
      </MyPageHeader>
      <SettingContainer>
        <Content>
          <Wrapper>
            <SubTitle>닉네임</SubTitle>
            <ProfileSection>
              <ProfilePic>
                <img src={GOM} alt="GOM" width={50} />
              </ProfilePic>
              <NicknameAndChange>
                <Nickname>{NickName?.nickname || '익명'}</Nickname>
                <ChevronRight
                  width={20}
                  height={20}
                  fill="#EEEEEE"
                  onClick={handleNicknameChange}
                />
              </NicknameAndChange>
            </ProfileSection>
            <SubTitle>테마</SubTitle>
            <Theme>
              <DarkModeTitle>테마변경</DarkModeTitle>
              <DarkModeSwitch onClick={handleToggleThemeChange}>
                <ToggleSwitch $isDark={isDarkMode}>
                  <ToggleBG src={toggleBg} $isDark={isDarkMode} />
                </ToggleSwitch>
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
  margin-bottom: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const ProfilePic = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background-size: cover;
  background-color: #ffecb6;
  margin-right: 15px;
  position: relative;

  img {
    width: 110%;
    height: 110%;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const NicknameAndChange = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 16px;
  color: white;
  max-width: 200px;
  word-wrap: break-word;
`;

const MyPageHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 16px;
    color: #eee;
    font-weight: 300;
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
  padding-top: 10px;
  justify-content: space-between;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 50px;
`;

const DarkModeTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #eee;
`;

const SubTitle = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: #eee;
  opacity: 67%;
`;

const DarkModeSwitch = styled.div`
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;

  p {
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
`;

const moveUpwards = keyframes`
from {
transform: translateY(-50%);
}
to {
transform: translateY(0);
}
`;

const moveDownwards = keyframes`
from {
transform: translateY(0);
}
to {
transform: translateY(-50%);
}
`;

const ToggleSwitch = styled.div<{ $isDark: boolean }>`
  width: 32px;
  height: 17px;
  background-color: #ccc;
  border-radius: 30px;
  position: relative;
  cursor: pointer;

  &:after {
    background-image: url(${sun});
    background-size: cover;
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.5s;

    ${(props) =>
      props.$isDark &&
      css`
        background-image: url(${moon});
        background-size: cover;
        left: 16px;
      `}
  }
`;

const ToggleBG = styled.img<{ $isDark: boolean }>`
  width: 32px;
  height: auto;

  animation: ${(props) => (props.$isDark ? moveUpwards : moveDownwards)} 0.5s
    forwards;
`;

const LogoutButton = styled.button`
  width: fit-content;
  padding-bottom: 30px;
  font-size: 12px;
  color: #eee;
  opacity: 67%;
  cursor: pointer;
  border: none;
`;
