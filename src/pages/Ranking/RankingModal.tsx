import { rankingStore } from '../../store/rankingStore';
import RankingBoard from './RankingBoard';
import styled, { keyframes } from 'styled-components';
import Back from '@/back.svg?react';
import Trophy from '@/trophy.svg?react';
import { useThemeStore } from '../../store/themeStore';

function RankingModal() {
  const { isOpen, closeModal } = rankingStore();
  const { isDarkMode } = useThemeStore();

  if (!isOpen) return null;

  const backbutton = isDarkMode ? '#eee' : '#000239';
  const trophyColor = isDarkMode ? '#eee' : '#000239';

  return (
    <>
      <ModalOverlay />
      <AnimatedWrapper onClick={() => closeModal()}>
        <WhiteContainer>
          <RankingHeader>
            <Back
              width={20}
              height={20}
              fill={backbutton}
              onClick={() => closeModal()}
              className="backButton"
            />
            <Trophy fill={trophyColor} className="trophy" />
          </RankingHeader>
          <Title>고민을 많이 해결해준 순위</Title>
          <RankingBoard />
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
  .backButton {
    margin-left: 20px;

    cursor: pointer;
  }
  .trophy {
    height: 20px;
    flex: 1;
    text-align: center;
    padding-right: 40px;
  }
`;

const Title = styled.p`
  position: relative;
  top: 16%;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  background-color: ${({ theme }) => theme.ModalOverlay};
  z-index: 90;
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
  background-color: ${({ theme }) => theme.ModalBox};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media screen and (max-width: 641px) {
    transform: translateY(-0px);
  }
`;
