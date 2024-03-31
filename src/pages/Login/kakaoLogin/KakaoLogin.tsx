import styled from 'styled-components';

function KakaoLogin() {
  const onClickToKakao = async () => {
    location.replace(`${KAKAO_AUTH_URL}`);
  };

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  console.log('Kakao Rest Api Key =', REST_API_KEY);

  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  console.log('Kakao Redirect URI =', REDIRECT_URI);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  console.log('Kakao Auth URL =', KAKAO_AUTH_URL);

  return (
    <div>
      <Kakao>
        <button className="Kakao" onClick={onClickToKakao}>
          카카오톡으로 로그인
        </button>
      </Kakao>
    </div>
  );
}

export default KakaoLogin;

const Kakao = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 350px;

  .Kakao {
    background-color: #f9e000;
    border-radius: 10px;
    padding: 15px;
    color: #624a3d;
    font-weight: bold;
    font-size: 15px;
  }
`;
