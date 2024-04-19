import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useStateModalStore } from '../../store/stateModalStore';

function StateModal() {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeStateModal = useStateModalStore((state) => state.closeStateModal);
  const statusMessage = useStateModalStore((state) => state.statusMessage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (modalRef.current && !modalRef.current.contains(target)) {
        closeStateModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeStateModal]);

  return (
    <ModalContainer ref={modalRef}>
      <p>{statusMessage}</p>
    </ModalContainer>
  );
}

export default StateModal;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 244px;
  height: 45px;
  background-color: rgba(12, 12, 12, 0.7);
  border-radius: 20px;
  position: absolute;
  bottom: 14%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    font-size: 12px;
  }
`;
