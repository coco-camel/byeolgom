import { useState, useEffect, useMemo } from 'react';
import planetA from '/assets/images/planetA.png';
import planetB from '/assets/images/planetB.png';
import planetC from '/assets/images/planetC.png';
import planetD from '/assets/images/planetD.png';
import planetE from '/assets/images/planetE.png';
import planetF from '/assets/images/planetF.png';
import planetG from '/assets/images/planetG.png';
import planetH from '/assets/images/planetH.png';
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
import { usePlanetShopStore } from '../../store/planetShopStore';
import { useShallow } from 'zustand/react/shallow';
import star from '@/star.svg';
import { SkeletonDiv } from '../../components/skeleton/skeletonStyle';
import { userStateStore } from '../../store/userStateStore';
import { useStateModalStore } from '../../store/stateModalStore';
import BuyPlanetModal from './Modal/BuyPlanetModal';
import { useChangePlanetMutation } from '../../hooks/mutations/useChangePlanet';

function PlanetShop() {
  const planets = useMemo(
    () => [
      [planetA, 'A', 0],
      [planetB, 'B', 0],
      [planetC, 'C', 3],
      [planetD, 'D', 5],
      [planetE, 'E', 7],
      [planetF, 'F', 10],
      [planetG, 'G', 15],
      [planetH, 'H', 20],
    ],
    [],
  );

  const [planetsState, setPlanetsState] = usePlanetShopStore(
    useShallow((state) => [state.planetsState, state.setPlanetsState]),
  );
  const [planet, setChangePlanet] = userStateStore(
    useShallow((state) => [state.planet, state.setChangePlanet]),
  );
  const openStateModal = useStateModalStore((state) => state.openStateModal);

  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [planetCost, setPlanetCost] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('');
  const [showBuyPlanetModal, setShowBuyPlanetModal] = useState(false);
  const { mutate: changePlanetMutate } = useChangePlanetMutation();

  useEffect(() => {
    setSelectedPlanet(planet);
  }, [planet]);

  const handlePlanetChangeClick = () => {
    if (buttonLabel === '적용하기') {
      changePlanetMutate(selectedPlanet, {
        onSuccess: () => {
          setChangePlanet(selectedPlanet),
            openStateModal('적용이 완료되었어요!');
        },
      });
    }
    if (buttonLabel === '구매하기') {
      setShowBuyPlanetModal(true);
    }
  };

  const handlePlanetClick = (planet: string) => {
    setSelectedPlanet(planet);
  };

  useEffect(() => {
    const planetCostFind = planets.find((item) => item[1] === selectedPlanet);
    const cost = planetCostFind ? Number(planetCostFind[2]) : 0;
    setPlanetCost(cost);
  }, [selectedPlanet, planets]);

  useEffect(() => {
    if (planetsState && planetsState.includes(selectedPlanet)) {
      if (planet === selectedPlanet) {
        setButtonLabel('사용중');
      } else {
        setButtonLabel('적용하기');
      }
    } else {
      setButtonLabel('구매하기');
    }
  }, [planetsState, selectedPlanet, planet]);

  const getPlanetsQuery = useGetPlanets();

  useEffect(() => {
    setPlanetsState(getPlanetsQuery.data);
  }, [getPlanetsQuery.data, setPlanetsState]);

  return (
    <PlanetShopArea>
      <PlanetShopHeader />
      <PlanetShopContainer>
        {planets.map((item, index) => (
          <PlanetItem
            key={index}
            onClick={() => handlePlanetClick(String(item[1]))}
            $isSelected={selectedPlanet === item[1]}
            $isUsing={planet === item[1]}
          >
            <img src={String(item[0])} />
            {getPlanetsQuery.isPending ? (
              <PlanetStatecontainer>
                <SkeletonDiv $width="50px" $height="20px" />
              </PlanetStatecontainer>
            ) : planetsState && planetsState.includes(String(item[1])) ? (
              <PlanetStatecontainer>
                <Check fill={planet === item[1] ? '#e88439' : '#eeeeee'} />
                <span>{planet === item[1] ? '사용중' : '보유중'}</span>
              </PlanetStatecontainer>
            ) : (
              <PlanetStatecontainer>
                <img src={star} height={24} />
                <span>x &nbsp; {item[2]}</span>
              </PlanetStatecontainer>
            )}
          </PlanetItem>
        ))}
      </PlanetShopContainer>
      <Button
        onClick={() => handlePlanetChangeClick()}
        disabled={planet === selectedPlanet}
        $isUsing={planet === selectedPlanet}
      >
        {buttonLabel}
      </Button>
      {showBuyPlanetModal && (
        <BuyPlanetModal
          setShowBuyPlanetModal={setShowBuyPlanetModal}
          planet={selectedPlanet}
          planetCost={planetCost}
        />
      )}
    </PlanetShopArea>
  );
}

export default PlanetShop;
