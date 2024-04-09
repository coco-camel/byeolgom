// Header.tsx
import { useState } from 'react';
import styled from 'styled-components';
import Trophy from '/assets/Trophy.svg';
import { useAuthStore } from '../../store/authStore';
import RankingBoard from '../../pages/Ranking/RankingBoard';

function Header() {
  const { isLoggedIn } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = 4;

  const toggleRankingModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HeaderArea>
      <HeaderInner>
        <button onClick={toggleRankingModal}>
          <img src={Trophy} alt="Trophy" />
        </button>
        <WorryCount>
          {isLoggedIn ? (
            <>
              <img src={Trophy} alt="Trophy" />
              {/* Assuming "xCount" is a placeholder. This should be dynamically set based on actual data */}
              <span>xCount</span>
            </>
          ) : (
            <div></div>
          )}
        </WorryCount>
      </HeaderInner>
      {isModalOpen && (
        <RankingBoard
          isOpen={isModalOpen}
          onRequestClose={toggleRankingModal}
          currentUser={currentUser}
          accessToken={''}
        />
      )}
    </HeaderArea>
  );
}

export default Header;

const WorryCount = styled.div`
  display: flex;
  align-items: center;
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
