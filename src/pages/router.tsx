import App from '../App';
import Main from './Main/Main';
import LoginPage from './Login/LoginPage';
import KakaoRedirect from './Login/kakaoLogin/KakaoRedirect';
import NaverRedirect from './Login/naverLogin/NaverCallback';
import { createBrowserRouter } from 'react-router-dom';
import PastContents from './PastContent/PastContents';
import PastContentDetail from './PastContnetDetail/PastContentDetail';
import SettingPage from './MyPage/SettingPage';
import ChangeNickName from './MyPage/ChangeNickName';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

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
            element: (
              <ProtectedRoute>
                <Main />,
              </ProtectedRoute>
            ),
          },
          {
            path: '/pastcontents',
            element: (
              <ProtectedRoute>
                <PastContents />,
              </ProtectedRoute>
            ),
          },
          {
            path: '/pastcontents/:whosecontent/:worryid',
            element: (
              <ProtectedRoute>
                <PastContentDetail />,
              </ProtectedRoute>
            ),
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
            path: '/mypage',
            element: (
              <ProtectedRoute>
                <SettingPage />,
              </ProtectedRoute>
            ),
          },
          {
            path: '/changenickname',
            element: (
              <ProtectedRoute>
                <ChangeNickName />,
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
