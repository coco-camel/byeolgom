import App from '../App';
import Main from './Main/Main';
import LoginPage from './Login/LoginPage';
import KakaoRedirect from './Login/kakaoLogin/KakaoRedirect';
import { createBrowserRouter } from 'react-router-dom';
import PastContents from './PastContent/PastContents';
import PastContentDetail from './PastContent/PastContentDetail';
import SendContents from './SendContent/SendContents';

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
      {
        path: '/pastcontents',
        element: <PastContents />,
      },
      {
        path: '/pastcontents/:whosecontent/:worryid',
        element: <PastContentDetail />,
      },
      {
        path: '/sendcontents',
        element: <SendContents />,
      },
    ],
  },
]);
