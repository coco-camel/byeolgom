import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useStateModalStore } from '../../store/stateModalStore';
import { useShallow } from 'zustand/react/shallow';
import check_bad from '@/check_bad.svg';
import Check from '@/check.svg?react';

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
    const handleClick = () => {
      setIsClosing(true);
      setTimeout(() => closeStateModal(), 300);
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [closeStateModal]);

  return (
    <ModalContainer ref={modalRef} $isClosing={isClosing}>
      {!checkbox ? (
        <Check fill="#e88439" />
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
  background-color: ${({ theme }) => theme.StateModal};
  border-radius: 20px;
  position: absolute;
  bottom: 14%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 800;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease
    forwards;

  p {
    font-size: 12px;
    margin: 0 10px;
  }
`;
