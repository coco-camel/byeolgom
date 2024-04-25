import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import back from '@/back.svg';
import star from '@/star.svg';
import planetA from '@/planetA.svg';
import planetB from '@/planetB.svg';
import planetC from '@/planetC.svg';
import planetD from '@/planetD.svg';
import Check from '@/check.svg?react';

function PlanetShop() {
  const planets = [planetA, planetB, planetC, planetD];
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
        {planets.map((planet, index) => (
          <PlanetItem key={index}>
            <img src={planet} />
            <PlanetStatecontainer>
              <Check fill="white" />
              <span>보유중</span>
            </PlanetStatecontainer>
          </PlanetItem>
        ))}
      </PlanetShopContainer>
      <Button>구매하기</Button>
    </PlanetShopArea>
  );
}

export default PlanetShop;
const PlanetStatecontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  span {
    font-size: 12px;
    padding: 0 5px;
  }
`;

const PlanetItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &:hover {
    border-radius: 10px;
    box-shadow: inset 0 0 0 2px white;
  }
`;

const PlanetShopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 20px;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
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
