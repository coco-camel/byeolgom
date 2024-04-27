import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ChatList() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <>
      <PageHeader>
        <p>채팅</p>
      </PageHeader>

      <div>
        <div>
          <h1 />
          <div>
            <input
              placeholder="이름"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="채팅방"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className={'button mt-20'} type="submit">
              가입
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ChatList;

const PageHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 16px;
    font-weight: 300;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;
