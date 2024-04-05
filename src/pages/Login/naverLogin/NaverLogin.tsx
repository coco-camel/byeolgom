import styled from 'styled-components';

function NaverLogin() {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  console.log('naver_client_id =', NAVER_CLIENT_ID);

  const NAVER_CALLBACK_URI = import.meta.env.VITE_NAVER_CALLBACK_URI;
  console.log('naver_callback_uri =', NAVER_CALLBACK_URI);

  const STATE = 'test';
  console.log('state =', STATE);

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_url=${NAVER_CALLBACK_URI}`;
  console.log('naver_auth_url =', NAVER_AUTH_URL);

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
  margin: auto;
  margin-top: 10px;
  width: fit-content;
  height: fit-content;
`;

const Button = styled.button`
  background-color: #2db400;
  border-radius: 50px;
  padding: 15px;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
