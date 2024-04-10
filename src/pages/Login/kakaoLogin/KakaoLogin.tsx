import styled from 'styled-components';

function KakaoLogin() {
  const onClickToKakao = async () => {
    location.replace(`${KAKAO_AUTH_URL}`);
  };

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <KakaoConstainer>
      <Button className="Kakao" onClick={onClickToKakao}></Button>
    </KakaoConstainer>
  );
}

export default KakaoLogin;

const KakaoConstainer = styled.div`
  width: fit-content;
  height: fit-content;
`;

const Button = styled.button`
  background-image: url('https://i.ibb.co/2cdRQ7x/kakao-login-large-wide.png');
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
