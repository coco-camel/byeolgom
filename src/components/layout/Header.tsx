import styled from 'styled-components';
import Trophy from '@/trophy.svg?react';
import CountRocket from '@/countRocket.svg?react';
import { useAuthStore } from '../../store/authStore';
import { useWorryCountStore } from '../../store/worryCountStore';
import { rankingStore } from '../../store/rankingStore';
import { SkeletonDiv } from '../skeleton/skeletonStyle';
import { useWorryCount } from '../../hooks/queries/useWorryCount ';

function Header() {
  const { isLoggedIn } = useAuthStore();
  const { openModal } = rankingStore((state) => ({
    openModal: state.openModal,
  }));
  const worryCount = useWorryCountStore((state) => state.worryCount);
  const worryCountQuery = useWorryCount();

  return (
    <HeaderArea>
      <HeaderInner>
        <button onClick={openModal}>
          <Trophy fill="#FED56B" />
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
    color: #eeeeee;
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
