import styled from 'styled-components';

function NaverLogin() {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;

  const NAVER_CALLBACK_URI = import.meta.env.VITE_NAVER_CALLBACK_URI;

  const STATE = 'test';

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_url=${NAVER_CALLBACK_URI}`;

  const onClicktoNaver = () => {
    location.replace(`${NAVER_AUTH_URL}`);
  };

  return (
    <NaverConstainer>
      <Button className="Naver" onClick={onClicktoNaver}>
        네이버 로그인
      </Button>
    </NaverConstainer>
  );
}

export default NaverLogin;

const NaverConstainer = styled.div`
  margin-top: 10px;
  width: fit-content;
  height: fit-content;
`;

const Button = styled.button`
  width: 260%;
  background-color: #2db400;
  border-radius: 50px;
  padding: 15px;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
