import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useStateModalStore } from '../../store/stateModalStore';
import { useShallow } from 'zustand/react/shallow';
import check from '/assets/images/check.svg';
import check_bad from '/assets/images/check_bad.svg';

function StateModal() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const [statusMessage, closeStateModal, checkbox] = useStateModalStore(
    useShallow((state) => [
      state.statusMessage,
      state.closeStateModal,
      state.checkbox,
    ]),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (modalRef.current && !modalRef.current.contains(target)) {
        setIsClosing(true);
        setTimeout(() => closeStateModal(), 300);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeStateModal]);

  return (
    <ModalContainer ref={modalRef} $isClosing={isClosing}>
      {!checkbox ? (
        <img src={check} width={20} height={20} />
      ) : (
        <img src={check_bad} width={20} height={20} />
      )}
      <p>{statusMessage}</p>
    </ModalContainer>
  );
}

export default StateModal;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%);
    bottom: 10%;
  }
  70% {
    opacity: 1;
    transform: translate(-50%, -50%);
    bottom: 15%;
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
    bottom: 14%;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%);
    bottom: 14%;
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%);
    bottom: 15%;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%);
    bottom: 10%;
  }
`;

const ModalContainer = styled.div<{ $isClosing: boolean }>`
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
  z-index: 300;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease
    forwards;

  p {
    font-size: 12px;
    margin: 0 10px;
  }
`;
