import GlobalFonts from './styles/GlobalFonts';
import GlobalStyle from './styles/GlobalStyles';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <Outlet />
    </>
  );
}

export default App;
