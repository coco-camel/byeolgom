import styled from 'styled-components';
import Trophy from '@/trophy.svg?react';
import CountRocket from '@/countRocket.svg?react';
import { useAuthStore } from '../../store/authStore';
import { useWorryCountStore } from '../../store/worryCountStore';
import { useEffect } from 'react';
import { useWorryCount } from '../../hooks/queries/useWorryCount ';
import { useShallow } from 'zustand/react/shallow';
import { rankingStore } from '../../store/rankingStore';
import { SkeletonDiv } from '../skeleton/skeletonStyle';

function Header() {
  const { isLoggedIn } = useAuthStore();
  const { openModal } = rankingStore((state) => ({
    openModal: state.openModal,
  }));
  const [worryCount, setWorryCountState] = useWorryCountStore(
    useShallow((state) => [state.worryCount, state.setWorryCountState]),
  );

  const worryCountQuery = useWorryCount();

  useEffect(() => {
    setWorryCountState(worryCountQuery.data);
  }, [worryCountQuery.data, setWorryCountState]);

  if (worryCountQuery.isError) return <div>Error</div>;

  return (
    <HeaderArea>
      <HeaderInner>
        <button onClick={openModal}>
          <Trophy fill="#EEEEEE" />
        </button>
        <WorryCount>
          {isLoggedIn ? (
            <>
              <CountRocket fill="#EEEEEE" />
              {worryCountQuery.isPending ? (
                <SkeletonDiv $width="30px" $height="20px" />
              ) : (
                <span> x {worryCount}</span>
              )}
            </>
          ) : (
            <div></div>
          )}
        </WorryCount>
      </HeaderInner>
    </HeaderArea>
  );
}

export default Header;

const WorryCount = styled.div`
  display: flex;
  align-items: center;
  span {
    padding-left: 10px;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 20px;
`;

const HeaderArea = styled.div`
  height: 54px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;
