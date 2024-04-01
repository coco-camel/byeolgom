import styled from 'styled-components';

function Footer() {
  return (
    <FooterArea>
      <FooterInner>
        <div>ㅎㅎ</div>
        <div>ㅎㅎ</div>
        <div>ㅎㅎ</div>
        <div>ㅎㅎ</div>
        <div>ㅎㅎ</div>
      </FooterInner>
    </FooterArea>
  );
}

export default Footer;

const FooterArea = styled.footer`
  width: 100%;
  background: #f7f9fa;
  color: #2f3438;
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  a {
    color: #2f3438;
  }
`;
const FooterInner = styled.div`
  display: flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  padding: 10px 15px;
  gap: 20px;
  background: #f7f9fa;
`;
