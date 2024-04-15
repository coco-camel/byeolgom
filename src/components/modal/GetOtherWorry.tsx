import { useState, useEffect } from 'react';
import styled from 'styled-components';
import back from '/assets/images/back.svg';
import deleteWorry from '/assets/images/deleteWorry.svg';
import report from '/assets/images/report.svg';
import rocketA from '/assets/images/rocketA.svg';
import rocketB from '/assets/images/rocketB.svg';
import rocketC from '/assets/images/rocketC.svg';
import sendLine from '/assets/images/sendLine.svg';
import starNotice from '/assets/images/starNotice.svg';
import takeStar from '/assets/images/takeStar.svg';
import { WorryDetail } from '../../types/WorryDetail.interface';
import { deleteContent, reportContent } from '../../api/sendContentApi';
import {
  ModalHeader,
  BackButton,
  AnimatedWrapper,
  StyledImg,
  WhiteBox,
  ModalOverlay,
  SendButton,
} from './ContentStyle';
import { sendContentReply, sendStarReply } from '../../api/sendContentApi';
import SendContents from '../../pages/SendContent/SendContents';
import { usePostArrivedStore } from '../../store/postArrivedStore';
import { formatDate } from '../../utills/formatDate/formatDate';

function GetOtherWorry({
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
  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] =
    useState<boolean>(true);
  const [sendStar, setSendStar] = useState(false);

  const { setRemovePostArrived } = usePostArrivedStore();
  const handleContentSubmit = async () => {
    try {
      const contentData = { content, fontColor };
      const params = { worryid: detail.worryId, commentid: detail.commentId };
      if (detail.commentId !== null) {
        params.commentid = detail.commentId;
      }

      if (sendStar) {
        await sendStarReply(params, contentData);
      } else {
        await sendContentReply(params, contentData);
      }
      setRemovePostArrived(detail.worryId);
      closeModal();
    } catch (error) {
      console.error(error);
    }
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

  const handleReport = async () => {
    try {
      await reportContent(
        { worryid: detail.worryId, commentid: detail.commentId },
        '불쾌한 언행',
      );
      setRemovePostArrived(detail.worryId);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContent({ worryid: detail.worryId });
      setRemovePostArrived(detail.worryId);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = () => {
    setShowDetail(false);
    setSendReply(true);
  };

  const handleInputClick = () => {
    setReplyWrite(true);
  };

  const handleOutSideClick = () => {
    setReplyWrite(false);
  };

  const handleSendStarClick = () => {
    setSendStar(!sendStar);
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
        <BackButton src={back} onClick={closeModal} />
        {showDetail && <ReportImg src={report} onClick={handleReport} />}
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
            <ContentText
              color={detail.fontColor}
              $marginTop={showDetail ? '60px' : '110px'}
            >
              {detail.content}
            </ContentText>
          )}
          {sendReply && (
            <>
              <LineImg
                src={sendLine}
                $marginTop={replyWrite ? '90px' : '0px'}
              />
              <SendContents
                onSend={(content, fontColor) => {
                  setContent(content);
                  setFontColor(fontColor);
                }}
                onInputClick={handleInputClick}
                placeholder={`답장을 입력해주세요.`}
                containerHeight={replyWrite ? '66%' : '37%'}
              />
            </>
          )}
          {showDetail && (
            <ButtonContainer>
              {detail.isSolved && <TakeStarImg src={takeStar} />}
              {!detail.isSolved && (
                <ReplyButton onClick={handleReply}>답장하기</ReplyButton>
              )}
              {detail.isSolved && (
                <ReplyButton onClick={() => removeCloseModal(detail.worryId)}>
                  확인
                </ReplyButton>
              )}
              <DeleteImg src={deleteWorry} onClick={handleDelete} />
            </ButtonContainer>
          )}
          {replyWrite && showStarText && (
            <StarButtonContainer>
              <StarButton
                className={sendStar ? 'active' : ''}
                onClick={handleSendStarClick}
              >
                <Circle className="Circle" />
                <StarText>답례 전송</StarText>
                <HoverImage src={starNotice} />
              </StarButton>
            </StarButtonContainer>
          )}
        </WhiteBox>
      </AnimatedWrapper>
      <ModalOverlay onClick={handleOutSideClick} />
    </>
  );
}

export default GetOtherWorry;

const DateText = styled.div`
  font-size: 12px;
  margin-top: 65px;
`;

const ContentText = styled.div<{ $marginTop?: string }>`
  font-size: 16px;
  margin-top: 60px;
  width: 70%;
  height: 25%;
  text-align: center;
  margin-top: ${(props) => props.$marginTop || '0px'};
  color: ${(props) => props.color || '#FFFFFF'};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 150px;
`;

const TakeStarImg = styled.img`
  position: absolute;
  margin-left: 75px;
  margin-top: -60px;
`;

const LineImg = styled.img<{ $marginTop?: string }>`
  margin-top: ${(props) => props.$marginTop || '0px'};
`;

const ReplyButton = styled.button`
  width: 145px;
  height: 35px;
  font-size: 12px;
  color: #2a2a2a;
  left: 50%;
  background-color: #eeeeee;
  border-radius: 30px;
  margin-left: 60px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #e88439;
  }
`;

const DeleteImg = styled.img`
  width: 24px;
  margin-left: 30px;
  cursor: pointer;
`;

const ReportImg = styled.img`
  width: 16px;
  margin-right: 20px;
  margin-top: 15px;
  cursor: pointer;
`;

const StarButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 77%;

  @media screen and (max-width: 641px) {
    top: 71%;
  }
`;

const StarButton = styled.button`
  display: flex;
  align-items: center;
  position: relative;

  &:hover .HoverImage {
    display: block;
  }

  &.active .Circle {
    background-color: #e88439;
  }
`;

const HoverImage = styled.img`
  display: none;
  position: absolute;
  top: -400%;
  left: 50%;
  transform: translateX(-50%);

  ${StarButton}:hover & {
    display: block;
  }
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 25px;
  border: 2px solid #b5b5bd;
`;

const StarText = styled.div`
  color: white;
  font-size: 14px;
  margin-left: 6px;
`;
