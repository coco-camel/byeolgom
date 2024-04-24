import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import back from '/assets/images/back.svg';
import star from '/assets/images/star.svg';
import planetC from '/assets/images/planetC.svg';
import check from '/assets/images/check.svg';

function PlanetShop() {
  const navigate = useNavigate();
  const handleBackNavigation = () => {
    navigate(-1);
  };
  return (
    <PlanetShopArea>
      <PlanetShopHeader>
        <button onClick={handleBackNavigation}>
          <img src={back} width={20} height={20} />
        </button>
        <h1>상점</h1>
        <StarCount>
          <img src={star} alt="Count Rocket" />
          <span> x {}</span>
        </StarCount>
      </PlanetShopHeader>
      <PlanetShopContainer>
        <PlanetItem>
          <img src={planetC} />
          <div>
            <img src={check} width={20} height={20} />
            <span>보유중</span>
          </div>
        </PlanetItem>
      </PlanetShopContainer>
      <Button>구매하기</Button>
    </PlanetShopArea>
  );
}

export default PlanetShop;
const PlanetItem = styled.div``;

const PlanetShopContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Button = styled.button`
  width: 145px;
  height: 35px;
  min-height: 35px;
  font-size: 12px;
  color: #2a2a2a;
  left: 50%;
  background-color: #eeeeee;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #e88439;
  }
`;

const PlanetShopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 90px);
`;
const PlanetShopHeader = styled.div`
  height: 54px;
  min-height: 54px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  button {
    display: flex;
    align-items: center;
  }
`;

const StarCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
