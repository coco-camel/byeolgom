import { useState, useEffect } from 'react';
import planetA from '@/planetA.svg';
import planetB from '@/planetB.svg';
import planetC from '@/planetC.svg';
import planetD from '@/planetD.svg';
import Check from '@/check.svg?react';
import PlanetShopHeader from './PlanetShopHeader';
import {
  Button,
  PlanetItem,
  PlanetShopArea,
  PlanetShopContainer,
  PlanetStatecontainer,
} from './planetShopStyle';
import { useGetPlanets } from '../../hooks/queries/useGetPlanets';
import { usePlanetShopStore } from '../../store/planetShop';
import { useShallow } from 'zustand/react/shallow';
import star from '@/star.svg';
import { SkeletonDiv } from '../../components/skeleton/skeletonStyle';
import { useAuthStore } from '../../store/authStore';
import { buyPlanet, changePlanet } from '../../api/planetShopApi';
import { useQueryClient } from '@tanstack/react-query';
import { useStarCountStore } from '../../store/starConuntStore';

function PlanetShop() {
  const planets = [
    [planetA, 'A', 0],
    [planetB, 'B', 1],
    [planetC, 'C', 3],
    [planetD, 'D', 5],
  ];

  const [planetsState, setPlanetsState, setAddPlanets] = usePlanetShopStore(
    useShallow((state) => [
      state.planetsState,
      state.setPlanetsState,
      state.setAddPlanets,
    ]),
  );
  const [userPlanet, setUserPlanet] = useAuthStore(
    useShallow((state) => [state.userPlanet, state.setUserPlanet]),
  );
  const deleteStarCount = useStarCountStore(
    (state) => state.setDeleteStarCount,
  );
  const [selectedPlanet, setSelectedPlanet] = useState('');

  useEffect(() => {
    setSelectedPlanet(userPlanet ?? '');
  }, [userPlanet]);

  const [buttonLabel, setButtonLabel] = useState('');

  const queryClient = useQueryClient();

  const handlePlanetChangeClick = (planet: string) => {
    const planetCostFind = planets.find((p) => p[1] === planet);
    const planetCost = planetCostFind ? Number(planetCostFind[2]) : 0;

    if (buttonLabel === '사용하기') {
      changePlanet(planet);
      setUserPlanet(planet);
    }
    if (buttonLabel === '구매하기') {
      buyPlanet(planet);
      deleteStarCount(planetCost);
      queryClient.invalidateQueries({
        queryKey: [['starCount'], ['getPlanets']],
      });

      setAddPlanets(planet);
      setUserPlanet(planet);
    }
  };

  const handlePlanetClick = (planet: string) => {
    setSelectedPlanet(planet);
  };

  useEffect(() => {
    if (planetsState && planetsState.includes(selectedPlanet)) {
      if (userPlanet === selectedPlanet) {
        setButtonLabel('사용중');
      } else {
        setButtonLabel('사용하기');
      }
    } else {
      setButtonLabel('구매하기');
    }
  }, [planetsState, selectedPlanet, userPlanet]);

  const getPlanetsQuery = useGetPlanets();

  useEffect(() => {
    setPlanetsState(getPlanetsQuery.data);
  }, [getPlanetsQuery.data, setPlanetsState]);

  return (
    <PlanetShopArea>
      <PlanetShopHeader />
      <PlanetShopContainer>
        {planets.map((planet, index) => (
          <PlanetItem
            key={index}
            onClick={() => handlePlanetClick(String(planet[1]))}
            $isSelected={selectedPlanet === planet[1]}
          >
            <img src={String(planet[0])} />
            {getPlanetsQuery.isPending ? (
              <PlanetStatecontainer>
                <SkeletonDiv $width="50px" $height="20px" />
              </PlanetStatecontainer>
            ) : planetsState && planetsState.includes(String(planet[1])) ? (
              <PlanetStatecontainer>
                <Check fill="white" />
                <span>보유중</span>
              </PlanetStatecontainer>
            ) : (
              <PlanetStatecontainer>
                <img src={star} height={24} />
                <span>x &nbsp; {planet[2]}</span>
              </PlanetStatecontainer>
            )}
          </PlanetItem>
        ))}
      </PlanetShopContainer>
      <Button
        onClick={() => handlePlanetChangeClick(selectedPlanet)}
        disabled={userPlanet === selectedPlanet}
        $isUsing={userPlanet === selectedPlanet}
      >
        {buttonLabel}
      </Button>
    </PlanetShopArea>
  );
}

export default PlanetShop;
