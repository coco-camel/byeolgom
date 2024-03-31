import App from '../App';
import LoginPage from './Login/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import Main from './Main/Main';
import PastContents from './PastContent/PastContents';
import PastContentDetail from './PastContent/PastContentDetail';

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
        path: '/pastcontents',
        element: <PastContents />,
      },
      {
        path: '/pastcontents/:whosecontent/:worryid',
        element: <PastContentDetail />,
      },
    ],
  },
]);
