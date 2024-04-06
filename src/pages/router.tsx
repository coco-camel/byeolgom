import App from '../App';
import Main from './Main/Main';
import LoginPage from './Login/LoginPage';
import KakaoRedirect from './Login/kakaoLogin/KakaoRedirect';
import NaverRedirect from './Login/naverLogin/NaverCallback';
import { createBrowserRouter } from 'react-router-dom';
import PastContents from './PastContent/PastContents';
import PastContentDetail from './PastContent/PastContentDetail';
import SendContents from './SendContent/SendContents';
import SettingPage from './MyPage/SettingPage';
import Layout from '../components/layout/Layout';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Main />,
          },
          {
            path: '/pastcontents',
            element: <PastContents />,
          },
          {
            path: '/pastcontents/:whosecontent/:worryid',
            element: <PastContentDetail />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/auth/naver/oAuth',
            element: <NaverRedirect />,
          },
          {
            path: '/auth/kakao/oAuth',
            element: <KakaoRedirect />,
          },
          {
            path: '/sendcontents',
            element: <SendContents />,
          },
          {
            path: '/mypage',
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
]);
