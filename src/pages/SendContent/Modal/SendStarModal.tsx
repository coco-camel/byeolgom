import styled from 'styled-components';
import ButtonContainer from '../../../components/button/ButtonContainer';
import cancel from '/assets/images/cancel.svg';
import { sendStarReply } from '../../../api/sendContentApi';
import { WorryDetail } from '../../../types/WorryDetail.interface';
import { usePostArrivedStore } from '../../../store/postArrivedStore';
import { useStateModalStore } from '../../../store/stateModalStore';

function SendStarModal({
  closeModal,
  closePageModal,
  detail,
  content,
  fontColor,
}: {
  closeModal: () => void;
  closePageModal: () => void;
  detail: WorryDetail;
  content: string;
  fontColor: string;
}) {
  const { setRemovePostArrived } = usePostArrivedStore();
  const { openStateModal } = useStateModalStore();

  const handleContentSubmit = async () => {
    try {
      const contentData = { content, fontColor };
      const params = { worryid: detail.worryId, commentid: detail.commentId };
      if (detail.commentId !== null) {
        params.commentid = detail.commentId;
      }

      await sendStarReply(params, contentData);
      setRemovePostArrived(detail.worryId);
      closeModal();
      openStateModal('답례가 무사히 전달되었어요!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CancelImg src={cancel} onClick={closePageModal} />
      <NoticeContainer>
        <SmallNoticeText>
          *답례를 보내면, 해당 유저와는 <br />
          더이상 답장을 주고 받지 못합니다.
        </SmallNoticeText>
        <SmallNoticeText>
          *계속 대화를 이어나가고 싶다면, <br />
          상대에게 <SpanText>1:1 채팅</SpanText> 요청을 보내주세요.
        </SmallNoticeText>
      </NoticeContainer>
      <ButtonContainer
        buttons={['답례 전송', '1:1 대화 요청']}
        width={['90px', '130px']}
        backColor={['#E88439', '#B5B5BD']}
        color={['#white', '#black']}
        onClickHandlers={[handleContentSubmit, closePageModal]}
      />
    </>
  );
}

export default SendStarModal;

const CancelImg = styled.img`
  position: absolute;
  right: 0;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
`;

const NoticeContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
  gap: 5px;
`;

const SmallNoticeText = styled.div`
  font-size: 12px;
  color: black;
  margin-top: 5px;
  white-space: pre-line;
`;

const SpanText = styled.span`
  font-size: 12px;
  color: #e88439;
`;
