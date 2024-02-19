import { useNavigate } from "react-router-dom";
import LoginButton from "../Login/LoginButton/LoginButton";
import UserHeader from "../UserHeader";
import styled from 'styled-components';

const ChangeInfoSocial = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <UserHeader>회원정보 변경</UserHeader>
      <div
        style={{
          width: "100%",
          gap: "24px",
          marginTop: "64px",
        }}
      >
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <LoginButton
            background={"#ffffff"}
            context={"회원탈퇴"}
            color={"#7bab6e"}
            borderColor={"#7bab6e"}
            arrowColor={"#7bab6e"}
            handler={() => navigate('/deleteUser')}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 100;
`

export default ChangeInfoSocial;
