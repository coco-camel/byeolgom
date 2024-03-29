import App from '../App';
import LoginPage from './Login/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import Main from './Main/Main';
import PastContent from './PastContent/PastContent';

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
        path: '/pastcontent',
        element: <PastContent />,
      },
    ],
  },
]);
