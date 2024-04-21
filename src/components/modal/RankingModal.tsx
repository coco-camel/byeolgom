import RankingBoard from '../../pages/Ranking/RankingBoard';
import styled, { keyframes } from 'styled-components';
import back from '/assets/images/back.svg';
import trophy from '/assets/images/trophy.svg';
import { RankingModalProps } from '../../types/RankingProps.interface';

function RankingModal({
  isOpen,
  currentUser,
  onRequestClose,
}: RankingModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay />
      <AnimatedWrapper onClick={onRequestClose}>
        <WhiteContainer>
          <RankingHeader>
            <BackButton src={back} onClick={onRequestClose} />
            <img className="trophy" src={trophy} alt="Trophy" />
          </RankingHeader>
          <Title>고민을 많이 해결해준 순위</Title>
          <RankingBoard
            isOpen={isOpen}
            currentUser={currentUser}
            onRequestClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </WhiteContainer>
      </AnimatedWrapper>
    </>
  );
}

export default RankingModal;

const slideIn = keyframes`
  from {
    top: -900px;
  }

  to {
    top: 0;
  }
`;

const RankingHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .trophy {
    height: 20px;
    flex: 1;
    text-align: center;
    padding-right: 40px;
  }
`;

export const BackButton = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;

  cursor: pointer;
`;

const Title = styled.p`
  position: relative;
  top: 16%;
  color: white;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  z-index: 150;
`;

const AnimatedWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 200;
  animation: ${slideIn} 0.3s ease-in-out;
`;

const WhiteContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 82%;
  transform: translateY(-0px);
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  background-color: #1e2734;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media screen and (max-width: 641px) {
    transform: translateY(-0px);
  }
`;
