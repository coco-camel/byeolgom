import { useEffect } from "react";

function NaverLogin() {
  
  const { naver } = window as any;
      const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
      console.log(NAVER_CLIENT_ID);

      const CALLBACK_URL = "http://localhost:3000/naver_callback"
      console.log(CALLBACK_URL);
      
      const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
          clientId: NAVER_CLIENT_ID,
          callbackUrl: CALLBACK_URL, 
          isPopup: false, // popup 형식으로 띄울것인지 설정
          loginButton: { color: 'white', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
      };
        
      useEffect(() => {
        initializeNaverLogin();
      }, []);

  return (
<>
<div id='naverIdLogin' />
</>
  )
}

export default NaverLogin

