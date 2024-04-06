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
      <Button className="Kakao" onClick={onClickToKakao}>
        카카오톡으로 로그인
      </Button>
    </KakaoConstainer>
  );
}

export default KakaoLogin;

const KakaoConstainer = styled.div`
  width: fit-content;
  height: fit-content;
`;

const Button = styled.button`
  width: 190%;
  background-color: #f9e000;
  border-radius: 50px;
  padding: 15px;
  color: #624a3d;
  font-weight: bold;
  font-size: 15px;
`;
