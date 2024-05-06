import Back from '@/back.svg?react';
import star from '@/star.svg';
import { useNavigate } from 'react-router-dom';
import { useStarCountStore } from '../../store/starConuntStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useStarCount } from '../../hooks/queries/useStarCount';
import { PlanetShopHeaderContainer, StarCount } from './planetShopStyle';
import { SkeletonDiv } from '../../components/skeleton/skeletonStyle';

function PlanetShopHeader() {
  const navigate = useNavigate();
  const handleBackNavigation = () => {
    navigate(-1);
  };
  const [starCount, setStarCountState] = useStarCountStore(
    useShallow((state) => [state.starCount, state.setStarCountState]),
  );

  const starCountQuery = useStarCount();

  useEffect(() => {
    setStarCountState(starCountQuery.data);
  }, [starCountQuery.data, setStarCountState]);

  if (starCountQuery.isError) return <div>Error</div>;

  return (
    <PlanetShopHeaderContainer>
      <button onClick={handleBackNavigation}>
        <Back width={20} height={20} fill="#EEEEEE" />
      </button>
      <h1>상점</h1>
      <StarCount>
        <img src={star} height={30} />
        {starCountQuery.isPending ? (
          <SkeletonDiv $width="30px" $height="20px" />
        ) : (
          <span> x {starCount}</span>
        )}
      </StarCount>
    </PlanetShopHeaderContainer>
  );
}

export default PlanetShopHeader;
