import styled from 'styled-components';

function NaverLogin() {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;

  const NAVER_CALLBACK_URI = import.meta.env.VITE_NAVER_CALLBACK_URI;

  const STATE = 'test';

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_url=${NAVER_CALLBACK_URI}`;

  const onClicktoNaver = () => {
    location.replace(`${NAVER_AUTH_URL}`);
  };

  // const onClickBlock = () => {
  //   alert('네이버 로그인은 현재 준비중입니다!');
  // };

  return (
    <NaverConstainer>
      <Button className="Naver" onClick={onClicktoNaver}></Button>
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
  background-image: url('https://i.ibb.co/Pj8Mfpv/naver-login-large-wide.png');
  background-size: 100%;
  width: 200px;
  height: 30px;
  cursor: pointer;
  @media (max-width: 640px) {
    width: 250px;
    height: 36px;
  }
  @media (max-width: 480px) {
    width: 200px;
    height: 30px;
  }
`;
