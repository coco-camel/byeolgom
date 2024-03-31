import KakaoLogin from './kakaoLogin/KakaoLogin'
import NaverLogin from './NaverLogin'


function LoginPage() {
  return (
    <div>
        <KakaoLogin />
        <NaverLogin />
    </div>
  )
}

export default LoginPage