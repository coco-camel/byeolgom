import GlobalStyle from './styles/GlobalStyles';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
