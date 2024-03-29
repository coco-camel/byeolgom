

function KakaoLogin() {

    const onClickToKakao = () => {
        location.replace(`${KAKAO_AUTH_URL}`);
      };
    
      const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
      console.log(REST_API_KEY);

      const REDIRECT_URI = "https://localhost:3000/auth/kakao/callback"
      console.log(REDIRECT_URI);
      
      const KAKAO_AUTH_URL
      = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      
      console.log(KAKAO_AUTH_URL);

  return (
        <div>
    <div>
      <button onClick={onClickToKakao}>
        카카오톡으로 로그인
      </button>
    </div>
  </div>
  )
}

export default KakaoLogin