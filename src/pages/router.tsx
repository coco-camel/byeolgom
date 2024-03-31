import App from '../App';
import Main from './Main/Main';
import LoginPage from './Login/LoginPage';
import KakaoRedirect from './Login/kakaoLogin/KakaoRedirect';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/kakao/oAuth',
        element: <KakaoRedirect />,
      },
    ],
  },
]);
