import App from '../App';
import Main from './Main/Main';
import LoginPage from './Login/LoginPage';
import KakaoRedirect from './Login/kakaoLogin/KakaoRedirect';
import { createBrowserRouter } from 'react-router-dom';
import PastContents from './PastContent/PastContents';
import PastContentDetail from './PastContent/PastContentDetail';
import SendContents from './SendContent/SendContents';
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
            path: '/auth/kakao/oAuth',
            element: <KakaoRedirect />,
          },
          {
            path: '/sendcontents',
            element: <SendContents />,
          },
        ],
      },
    ],
  },
]);
