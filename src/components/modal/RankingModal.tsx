import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const RankingModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: '10px' }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RankingModal;
