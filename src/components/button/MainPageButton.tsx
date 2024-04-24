import styled from 'styled-components';
import shop from '/assets/images/shop.svg';
import { Link } from 'react-router-dom';
interface MainPageBtnProps {
  link: string;
  item?: string;
}

interface PlanetProps {
  $item: string;
}
function MainPageButton({ link, item = '' }: MainPageBtnProps) {
  return (
    <Link to={link}>
      <PlanetWrap $item={item}>
        <img src={item === 'shop' ? shop : ''} width={20} height={20} />
      </PlanetWrap>
    </Link>
  );
}

export default MainPageButton;

const PlanetWrap = styled.div<PlanetProps>`
  position: absolute;
  background-color: #2f4768;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  bottom: 74px;
  ${(props) => (props.$item === 'shop' ? 'right: 20px;' : 'left: 20px;')}
`;
