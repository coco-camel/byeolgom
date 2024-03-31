import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authInstance } from "../../../api/api";
import styled from "styled-components";

function KakaoRedirect() {
  const location = useLocation();
  const CODE = location.search.split("=")[1];

  useEffect(() => {
    if (!location.search) return;
    sendAuthorizationCode();
  }, []);

  const sendAuthorizationCode = () => {
    authInstance.post(`/kakao`, {
      code: CODE,
    })
    .then ((res) => console.log(res.data));
    console.log(CODE);
  };

  return (
    <RedirectContainer>
      Redirect 페이지입니다
    </RedirectContainer>
  )
}

export default KakaoRedirect;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 340px;
  font-weight: 500;
`