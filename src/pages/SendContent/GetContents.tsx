/* eslint-disable no-constant-condition */
import { useState, useEffect } from 'react';
import Back from '@/back.svg?react';
import deleteWorry from '@/deleteWorry.svg';
import report from '@/report.svg';
import rocketA from '@/rocketA.svg';
import rocketB from '@/rocketB.svg';
import rocketC from '@/rocketC.svg';
import sendLine from '@/sendLine.svg';
import starNotice from '@/starNotice.svg';
import takeStar from '@/takeStar.svg';
import { WorryDetail } from '../../types/WorryDetail.interface';
import { sendContentReply } from '../../api/sendContentApi';
import {
  ModalHeader,
  AnimatedWrapper,
  StyledImg,
  WhiteBox,
  ModalOverlay,
  SendButton,
  DateText,
  ContentText,
  ButtonContainer,
  TakeStarImg,
  LineContainer,
  ReplyButton,
  DeleteImg,
  ReportImg,
  StarButtonContainer,
  StarButton,
  HoverImage,
  Circle,
  StarText,
} from './ContentStyle';
import SendContents from './SendContents';
import { usePostArrivedStore } from '../../store/postArrivedStore';
import { formatDate } from '../../utills/formatDate/formatDate';
import { useStateModalStore } from '../../store/stateModalStore';
import PageModal from '../../components/modal/PageModal';
import { useThemeStore } from '../../store/themeStore';
import { badWordsFilter } from '../../utills/badWords/badWords';

function GetContents({
  detail,
  closeModal,
  removeCloseModal,
}: {
  detail: WorryDetail;
  closeModal: () => void;
  removeCloseModal: (worryId: number) => void;
}) {
  const [showDetail, setShowDetail] = useState(true);
  const [sendReply, setSendReply] = useState(false);
  const [replyWrite, setReplyWrite] = useState(false);
  const [showStarText, setShowStarText] = useState(false);
  const [sendStar, setSendStar] = useState(false);

  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] =
    useState<boolean>(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendStarModal, setShowSendStarModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { setRemovePostArrived } = usePostArrivedStore();
  const { openStateModal } = useStateModalStore();
  const { isDarkMode } = useThemeStore();

  const handleContentSubmit = async () => {
    const filteredText = badWordsFilter(content);
    if (filteredText) {
      openStateModal('바르고 고운 말 사용 부탁드려요!', true);
      return;
    }
    try {
      const contentData = { content, fontColor };
      const params = { worryid: detail.worryId, commentid: detail.commentId };
      if (detail.commentId !== null) {
        params.commentid = detail.commentId;
      }

      if (sendStar) {
        setShowSendStarModal(true);
      } else {
        await sendContentReply(params, contentData);
        setRemovePostArrived(detail.worryId);
        closeModal();
        openStateModal('로켓이 무사히 되돌아갔어요!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleShowSendStarModal = () => {
    setShowSendStarModal(!showSendStarModal);
  };

  const handleShowReportModal = () => {
    setShowReportModal(!showReportModal);
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

  const colorChange = (fontColor: string) => {
    if (fontColor === '#EEEEEE' || fontColor === '#000239') {
      return isDarkMode ? '#EEEEEE' : '#000239';
    } else {
      return detail.fontColor;
    }
  };

  useEffect(() => {
    setIsSendButtonDisabled(content.trim().length === 0);
  }, [content]);

  useEffect(() => {
    const token = localStorage.getItem('access_Token');
    if (token !== null) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.userId;

      if (userId === detail.worryUserId) {
        setShowStarText(true);
      } else {
        setShowStarText(false);
      }
    } else {
      console.error('토큰이 없습니다.');
    }
  }, [detail.worryUserId]);

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
        {showDetail && (
          <ReportImg src={report} onClick={handleShowReportModal} />
        )}
        {sendReply && (
          <SendButton
            onClick={handleContentSubmit}
            disabled={isSendButtonDisabled}
          >
            전송하기
          </SendButton>
        )}
      </ModalHeader>

      <AnimatedWrapper>
        <StyledImg src={getRocketImage(detail.icon)} />
        <WhiteBox>
          {showDetail && <DateText>{formatDate(detail.createdAt)}</DateText>}
          {!replyWrite && (
            <>
              {detail.parentContent && !sendReply && (
                <>
                  <ContentText
                    color={'#868690'}
                    $height={'12%'}
                    $marginTop={showDetail ? '60px' : '110px'}
                  >
                    {detail.parentContent}
                  </ContentText>
                  <LineContainer>
                    <img src={sendLine} />
                  </LineContainer>
                </>
              )}
              <ContentText
                color={colorChange(detail.fontColor)}
                $marginTop={
                  detail.parentContent && showDetail
                    ? '40px'
                    : showDetail
                      ? '60px'
                      : '110px'
                }
              >
                {detail.content}
              </ContentText>
            </>
          )}
          {sendReply && (
            <>
              <LineContainer
                $marginTop={replyWrite ? '62px' : '0px'}
                onClick={() => {
                  setSendReply(true);
                  setReplyWrite(false);
                }}
              >
                <img src={sendLine} />
              </LineContainer>
              <SendContents
                onSend={(content, fontColor) => {
                  setContent(content);
                  setFontColor(fontColor);
                }}
                onInputClick={() => setReplyWrite(true)}
                placeholder={`답장을 입력해주세요.`}
                containerHeight={replyWrite ? '74.5%' : '48%'}
              />
            </>
          )}

          {showDetail && (
            <ButtonContainer>
              {!detail.isSolved && (
                <>
                  <ReplyButton
                    onClick={() => {
                      setShowDetail(false);
                      setSendReply(true);
                    }}
                  >
                    답장하기
                  </ReplyButton>
                  <DeleteImg
                    src={deleteWorry}
                    onClick={handleShowDeleteModal}
                  />
                </>
              )}
              {detail.isSolved && (
                <>
                  <TakeStarImg>
                    <img src={takeStar} />
                    <span>답례를 받았아요</span>
                  </TakeStarImg>
                  <ReplyButton onClick={() => removeCloseModal(detail.worryId)}>
                    확인
                  </ReplyButton>
                </>
              )}
            </ButtonContainer>
          )}
          {replyWrite && showStarText && (
            <StarButtonContainer>
              <StarButton
                className={sendStar ? 'active' : ''}
                onClick={() => setSendStar(!sendStar)}
              >
                <Circle className="Circle" />
                <StarText>답례 전송</StarText>
                <HoverImage src={starNotice} />
              </StarButton>
            </StarButtonContainer>
          )}
        </WhiteBox>
      </AnimatedWrapper>
      <ModalOverlay />

      {showDeleteModal && (
        <PageModal
          showDeleteModal={true}
          detail={detail}
          closeModal={closeModal}
          closePageModal={handleShowDeleteModal}
        />
      )}
      {showReportModal && (
        <PageModal
          showReportModal={true}
          detail={detail}
          closeModal={closeModal}
          closePageModal={handleShowReportModal}
        />
      )}
      {showSendStarModal && (
        <PageModal
          showSendStarModal={true}
          detail={detail}
          content={content}
          fontColor={fontColor}
          closeModal={closeModal}
          closePageModal={handleShowSendStarModal}
        />
      )}
    </>
  );
}

export default GetContents;
