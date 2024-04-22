import styled from 'styled-components';
import ButtonContainer from '../../../components/button/ButtonContainer';

function ReportModal() {
  return (
    <>
      <NoticeContainer>
        <NoticeText>신고사유를 입력해주세요.</NoticeText>
      </NoticeContainer>
      <ButtonContainer
        buttons={['취소', '신고하기']}
        width={['60px', '140px']}
        backColor={['#B5B5BD', '#E88439']}
        color={['#black', '#white']}
        onClickHandlers={[]}
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
  margin-top: 40px;
`;

const NoticeText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;
