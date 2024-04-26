import styled from 'styled-components';
import Shop from '@/shop.svg?react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

interface MainPageBtnProps {
  link: string;
  item?: string;
}

interface PlanetProps {
  $item: string;
}
function MainPageButton({ link, item = '' }: MainPageBtnProps) {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? '#eee' : '#000239';

  return (
    <Link to={link}>
      <PlanetWrap $item={item}>
        {item === 'shop' ? <Shop fill={theme} /> : <div>g</div>}
      </PlanetWrap>
    </Link>
  );
}

export default MainPageButton;

const PlanetWrap = styled.div<PlanetProps>`
  position: absolute;
  background-color: ${({ theme }) => theme.footerArea};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  bottom: 74px;
  ${(props) => (props.$item === 'shop' ? 'right: 20px;' : 'left: 20px;')}
`;
