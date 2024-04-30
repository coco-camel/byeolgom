import { useState, useEffect } from 'react';
import rocketA from '@/rocketA.svg';
import rocketB from '@/rocketB.svg';
import rocketC from '@/rocketC.svg';
import Back from '@/back.svg?react';
import SendContents from './SendContents';
import { sendContent } from '../../api/sendContentApi';
import {
  ModalHeader,
  SendButton,
  AnimatedWrapper,
  StyledImg,
  WhiteBox,
  ModalBox,
  ModalOverlay,
  RocketButton,
  DummyBox,
} from './ContentStyle';
import { useWorryCountStore } from '../../store/worryCountStore';
import { useStateModalStore } from '../../store/stateModalStore';

function SendMyWorry({ closeModal }: { closeModal: () => void }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>('A');
  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] =
    useState<boolean>(true);
  const { setWorryCounteDcrement } = useWorryCountStore();
  const { openStateModal } = useStateModalStore();

  const handleContentSubmit = async () => {
    try {
      const contentData = { content, icon: selectedIcon, fontColor };
      await sendContent(contentData);
      setWorryCounteDcrement();
      closeModal();
      openStateModal('로켓이 무사히 출발했어요!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    setShowModal(false);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const getRocketImage = (icon: string) => {
    switch (icon) {
      case 'A':
        return rocketA;
      case 'B':
        return rocketB;
      case 'C':
        return rocketC;
      default:
        return rocketA;
    }
  };

  useEffect(() => {
    setIsSendButtonDisabled(content.trim().length === 0);
  }, [content]);

  return (
    <>
      <ModalHeader>
        <Back
          width={20}
          height={20}
          fill="#EEEEEE"
          className="backButton"
          onClick={closeModal}
        />
        <SendButton
          onClick={handleContentSubmit}
          disabled={isSendButtonDisabled}
        >
          전송하기
        </SendButton>
      </ModalHeader>
      <AnimatedWrapper>
        <StyledImg
          src={getRocketImage(selectedIcon)}
          onClick={handleModalToggle}
        />
        {showModal && (
          <ModalBox>
            <div>
              <RocketButton
                onClick={() => handleIconClick('A')}
                src={rocketA}
              />
              <RocketButton
                onClick={() => handleIconClick('B')}
                src={rocketB}
              />
              <RocketButton
                onClick={() => handleIconClick('C')}
                src={rocketC}
                $isLast
              />
            </div>
          </ModalBox>
        )}
        <WhiteBox>
          <DummyBox />
          <SendContents
            onSend={(content, fontColor) => {
              setContent(content);
              setFontColor(fontColor);
            }}
            placeholder={`어떤 고민이 있나요?\n자유롭게 입력해보세요.`}
            containerHeight="80.5%"
          />
        </WhiteBox>
      </AnimatedWrapper>
      <ModalOverlay />
    </>
  );
}

export default SendMyWorry;
