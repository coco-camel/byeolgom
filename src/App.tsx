import GlobalFonts from './styles/GlobalFonts';
import GlobalStyle from './styles/GlobalStyles';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeStore } from './store/themeStore';
import { lightTheme, darkTheme } from './styles/Theme';

function App() {
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <GlobalFonts />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
