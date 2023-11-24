import UserHeader from "../components/UserHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginButton from "../components/Login/LoginButton/LoginButton";

const Find = () => {
  return (
    <FindWrapper>
      <UserHeader children={"계정 찾기"} />

      <BtnWrapper>
        <Link to="/findID" style={{ textDecoration: "none" }}>
          <LoginButton
            background={"#7BAB6E"}
            context={"아이디 찾기"}
            color={"#FFF"}
            // borderColor={"#7bab6e"}
            arrowColor={"#FFF"}
            margin={"54px 24px 24px 24px"}
          />
        </Link>
        <Link to="/findPW" style={{ textDecoration: "none" }}>
          <LoginButton
            background={"#7BAB6E"}
            context={"비밀번호 찾기"}
            color={"#FFF"}
            // borderColor={"#7bab6e"}
            arrowColor={"#FFF"}
            margin={"0px 24px 12px 24px"}
          />
        </Link>
      </BtnWrapper>
    </FindWrapper>
  );
};

const FindWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const BtnWrapper = styled.div`
  width: 100%;
  padding: 0px 0px;
`;

export default Find;
