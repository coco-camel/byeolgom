import styled, { keyframes } from 'styled-components';
import { WorryDetail } from '../../types/WorryDetail.interface';
import DeleteModal from '../../pages/SendContent/Modal/DeleteModal';
import ReportModal from '../../pages/SendContent/Modal/ReportModal';
import SendStarModal from '../../pages/SendContent/Modal/SendStarModal';

function PageModal({
  showDeleteModal,
  showReportModal,
  showSendStarModal,
  detail,
  content = '',
  fontColor = '',
  closeModal,
  closePageModal,
}: {
  showDeleteModal?: boolean;
  showReportModal?: boolean;
  showSendStarModal?: boolean;
  detail: WorryDetail;
  content?: string;
  fontColor?: string;
  closeModal: () => void;
  closePageModal: () => void;
}) {
  return (
    <>
      <ModalContainer>
        <AnimatedWrapper>
          <WhiteBox>
            {showDeleteModal && (
              <DeleteModal
                closeModal={closeModal}
                closePageModal={closePageModal}
                detail={detail}
              />
            )}
            {showReportModal && (
              <ReportModal
                closeModal={closeModal}
                closePageModal={closePageModal}
                detail={detail}
              />
            )}
            {showSendStarModal && (
              <SendStarModal
                closeModal={closeModal}
                closePageModal={closePageModal}
                detail={detail}
                content={content}
                fontColor={fontColor}
              />
            )}
          </WhiteBox>
        </AnimatedWrapper>
      </ModalContainer>
      <ModalOverlay />
    </>
  );
}

export default PageModal;

const slideIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  40% {
    transform: scale(1.05);
    opacity: 1;
  }
  70% {
    transform: scale(0.95);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const AnimatedWrapper = styled.div`
  position: relative;
  z-index: 200;
  animation: ${slideIn} 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const WhiteBox = styled.div`
  position: relative;
  width: 260px;
  min-height: 155px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000087;
  z-index: 995;
`;
