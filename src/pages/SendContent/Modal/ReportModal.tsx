import { useState } from 'react';
import styled from 'styled-components';
import ButtonContainer from '../../../components/button/ButtonContainer';
import RadioButton from '../../../components/button/RadioButton';
import { reportContent } from '../../../api/sendContentApi';
import { usePostArrivedStore } from '../../../store/postArrivedStore';
import { useStateModalStore } from '../../../store/stateModalStore';
import { WorryDetail } from '../../../types/WorryDetail.interface';
import { useQueryClient } from '@tanstack/react-query';
import { badWordsFilter } from '../../../utills/badWords/badWords';

function ReportModal({
  detail,
  closeModal,
  closePageModal,
}: {
  detail: WorryDetail;
  closeModal: () => void;
  closePageModal: () => void;
}) {
  const { setRemovePostArrived } = usePostArrivedStore();
  const { openStateModal } = useStateModalStore();

  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const queryClient = useQueryClient();

  const handleReport = async () => {
    const filteredText = badWordsFilter(customReason);
    if (filteredText) {
      openStateModal('바르고 고운 말 사용 부탁드려요!', true);
      return;
    }
    try {
      let reasonsToSend = selectedReason;
      if (customReason.trim() !== '') {
        reasonsToSend += `: ${customReason}`;
      }

      await reportContent(
        { worryid: detail.worryId, commentid: detail.commentId },
        reasonsToSend,
      );
      setRemovePostArrived(detail.worryId);
      queryClient.invalidateQueries({
        queryKey: ['worryCount'],
      });
      closeModal();
      openStateModal('신고 접수가 완료되었습니다');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRadioButtonClick = (reason: string) => {
    if (reason === '기타') {
      setSelectedReason(reason);
      setCustomReason('');
    } else {
      setSelectedReason(reason);
      setCustomReason('');
    }
  };

  const handleCustomReasonChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCustomReason(event.target.value);
  };

  const radioButtons = [
    {
      text: '상업적/홍보성',
    },
    { text: '음란/선정성' },
    { text: '불법정보' },
    {
      text: '욕설/인신공격',
    },
    { text: '개인정보노출' },
    { text: '기타' },
  ];

  return (
    <>
      <NoticeContainer>
        <NoticeText>신고사유를 입력해주세요.</NoticeText>
      </NoticeContainer>
      <RadioButtonContainer>
        {radioButtons.map((button) => (
          <RadioButton
            text={button.text}
            $isActive={button.text === selectedReason}
            onClickHandlers={() => handleRadioButtonClick(button.text)}
          />
        ))}
        <StyledAreaWrapper isActive={selectedReason === '기타'}>
          <StyledArea
            value={customReason}
            onChange={handleCustomReasonChange}
          />
        </StyledAreaWrapper>
      </RadioButtonContainer>
      <ButtonContainer
        buttons={['취소', '신고하기']}
        width={['60px', '140px']}
        backColor={['#B5B5BD', '#E88439']}
        color={['black', 'white']}
        onClickHandlers={[closePageModal, handleReport]}
      />
    </>
  );
}

export default ReportModal;

const NoticeContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
`;

const NoticeText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 12px;
  gap: 10px;
`;

const StyledAreaWrapper = styled.div<{ isActive: boolean }>`
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
`;

const StyledArea = styled.textarea`
  width: 214px;
  height: 100px;
  border-radius: 7px;
  border-color: #b5b5bd;
  overflow: auto;
  white-space: pre-line;
  resize: none;
  padding: 10px;
`;
