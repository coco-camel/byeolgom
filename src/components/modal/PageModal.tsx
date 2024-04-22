import styled, { keyframes } from 'styled-components';
import DeleteModal from '../../pages/SendContent/Modal/DeleteModal';
import ReportModal from '../../pages/SendContent/Modal/ReportModal';
import { WorryDetail } from '../../types/WorryDetail.interface';

function PageModal({
  showDeleteModal,
  showReportModal,
  detail,
  closeModal,
  closePageModal,
}: {
  showDeleteModal?: boolean;
  showReportModal?: boolean;
  detail: WorryDetail;
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
            {showReportModal && <ReportModal />}
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
