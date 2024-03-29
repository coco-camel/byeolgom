import { Outlet } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <LoginPage />
    </>
  );
}

export default App;
