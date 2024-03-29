import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <div>Main</div>
      <Link to={'/login'}>로그인이동</Link>
    </>
  );
}

export default Main;
