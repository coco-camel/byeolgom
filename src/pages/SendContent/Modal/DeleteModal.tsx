import styled from 'styled-components';
import ButtonContainer from '../../../components/button/ButtonContainer';
import { usePostArrivedStore } from '../../../store/postArrivedStore';
import { useStateModalStore } from '../../../store/stateModalStore';
import { WorryDetail } from '../../../types/WorryDetail.interface';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteContentMutation } from '../../../hooks/mutations/useDeleteContent';

function DeleteModal({
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

  const { mutate: deleteContentMutate } = useDeleteContentMutation();

  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteContentMutate(
      { worryid: detail.worryId },
      {
        onSuccess: () => {
          setRemovePostArrived(detail.worryId);
          queryClient.invalidateQueries({
            queryKey: ['worryCount'],
          });
          closeModal();
          openStateModal('로켓이 어딘가로 떠났습니다...');
        },
      },
    );
  };

  return (
    <>
      <NoticeContainer>
        <NoticeText>
          정말 <SpanText>삭제</SpanText>하시겠습니까?
        </NoticeText>
        <SmallNoticeText>*삭제하면 되돌릴 수 없어요.</SmallNoticeText>
      </NoticeContainer>
      <ButtonContainer
        buttons={['취소', '삭제']}
        width={['100px']}
        backColor={['#B5B5BD', '#E88439']}
        color={['#black', '#white']}
        onClickHandlers={[closePageModal, handleDelete]}
      />
    </>
  );
}

export default DeleteModal;

const NoticeContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
`;

const NoticeText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const SpanText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #e88439;
`;

const SmallNoticeText = styled.div`
  font-size: 12px;
  color: black;
  margin-top: 5px;
`;
