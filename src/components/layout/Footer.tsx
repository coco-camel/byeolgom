import styled from 'styled-components';
import locker from '/assets/locker.svg';
import home from '/assets/home.svg';
import rocket from '/assets/rocket.svg';
import setting from '/assets/setting.svg';
import chat from '/assets/chat.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <FooterArea>
      <FooterInner>
        <Link to={'/'}>
          <img src={home} />
        </Link>
        <Link to={'/pastcontents'}>
          <img src={locker} />
        </Link>
        <div></div>
        <Link to={'/'}>
          <img src={chat} />
        </Link>
        <Link to={'/'}>
          <img src={setting} />
        </Link>
        <Sendwrap>
          <Link to={'/sendcontents'}>
            <img src={rocket} />
          </Link>
        </Sendwrap>
      </FooterInner>
    </FooterArea>
  );
}

export default Footer;
const Sendwrap = styled.div`
  position: absolute;
  margin-bottom: 50px;
`;

const FooterArea = styled.footer`
  width: 100%;
  color: #2f3438;
  position: absolute;
  bottom: 0;
  left: 0;
`;
const FooterInner = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  padding: 15px 15px;
  gap: 20px;
  background: rgba(222, 222, 222, 0.6);
`;
