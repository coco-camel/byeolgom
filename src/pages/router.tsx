import App from '../App';
import LoginPage from './Login/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import Main from './Main/Main';

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
    ],
  },
]);
