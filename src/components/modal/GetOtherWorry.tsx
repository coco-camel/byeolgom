import { useState, useEffect } from 'react';
import styled from 'styled-components';
import back from '/assets/back.svg';
import deleteWorry from '/assets/deleteWorry.svg';
import report from '/assets/report.svg';
import rocketA from '/assets/rocketA.svg';
import rocketB from '/assets/rocketB.svg';
import rocketC from '/assets/rocketC.svg';
import sendLine from '/assets/sendLine.svg';
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
import { sendContentReply } from '../../api/sendContentApi';
import SendContents from '../../pages/SendContent/SendContents';

function GetOtherWorry({
  detail,
  closeModal,
}: {
  detail: WorryDetail;
  closeModal: () => void;
}) {
  const [showDetail, setShowDetail] = useState(true);
  const [sendReply, setSendReply] = useState(false);
  const [replyWrite, setReplyWrite] = useState(false);
  const [content, setContent] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] =
    useState<boolean>(true);

  const handleContentSubmit = async () => {
    try {
      const contentData = { content, fontColor };
      const params = { worryid: detail.worryId, commentid: detail.commentId };
      if (detail.commentId !== null) {
        params.commentid = detail.commentId;
      }
      const response = await sendContentReply(params, contentData);
      console.log(response);
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
      await reportContent({ commentid: detail.commentId }, '불쾌한 언행');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContent({ worryid: detail.worryId });
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

  const formattedDate = new Date(detail.createdAt)
    .toISOString()
    .replace(/T/, ' ')
    .replace(/:\d{2}\.\d{3}Z/, '')
    .replace(/-/g, '.');

  useEffect(() => {
    setIsSendButtonDisabled(content.trim().length === 0);
  }, [content]);

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
          {showDetail && <DateText>{formattedDate}</DateText>}
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
              <LineImg src={sendLine} />
              <SendContents
                onSend={(content, fontColor) => {
                  setContent(content);
                  setFontColor(fontColor);
                }}
                onInputClick={handleInputClick}
                placeholder={`답장을 입력해주세요.`}
                containerHeight={replyWrite ? '66%' : '44%'}
              />
            </>
          )}
          {showDetail && (
            <ButtonContainer>
              <ReplyButton onClick={handleReply}>답장하기</ReplyButton>
              <DeleteImg src={deleteWorry} onClick={handleDelete} />
            </ButtonContainer>
          )}
          {replyWrite && (
            <StarButtonContainer>
              <StarButton>
                <Circle />
                <StarText>답례 전송</StarText>
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
  margin-top: ${(props) => props.$marginTop || '0px'};
  color: ${(props) => props.color || '#FFFFFF'};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 270px;
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

const LineImg = styled.img`
  margin-top: 90px;
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
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 25px;
  border: 2px solid #b5b5bd;

  &:active {
    background-color: #e88439;
  }
`;

const StarText = styled.div`
  color: white;
  font-size: 14px;
  margin-left: 6px;
`;
