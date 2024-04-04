import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackScreen from "../BlackScreen/BlackScreen";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import LoginButton from "../Login/LoginButton/LoginButton";
import UserHeader from "../UserHeader";
import styled from 'styled-components';
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { ReactComponent as NextArrowWhite } from "../../images/ic_next_arrow_white.svg";
import ChangePw from "./ChangePw";
import ChangePhoneNumber from './ChangePhoneNumber';
import DeleteUser from "../../pages/DeleteUser";

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 8px;
  border-radius: 16px;
  padding: 16px;
  color: #FF6B6B;
  z-index: 500;
`;

const ModalButton1 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #F0F0F0;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #808080;
  font-size: 18px;
`;

const ModalButton2 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #FF6B6B;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #FFFFFF;
  font-size: 18px;
`;

const ChangeInfo = () => {
  const [showChangePw, setShowChangePw] = useState(false);
  const [showChangePhoneNumber, setShowChangePhoneNumber] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const navigate = useNavigate();

  return (
    <Wrapper>
      {showChangePw && <ChangePw setShowChangePw={setShowChangePw}/>}
      {showChangePhoneNumber && <ChangePhoneNumber setShowChangePhoneNumber={setShowChangePhoneNumber}/>}
      {showDeleteUser ?
        <DeleteUser setShowDeleteUser={setShowDeleteUser}/> :
        <>
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
              <Button
                buttonSize={ButtonSize.LARGE}
                buttonTheme={ButtonTheme.GREEN}
                handler={() => {
                  setShowChangePw(true);
                }}
              >
                비밀번호 변경
                <NextArrowWhite/>
              </Button>
              <Button
                buttonSize={ButtonSize.LARGE}
                buttonTheme={ButtonTheme.GREEN}
                handler={() => {
                  setShowChangePhoneNumber(true);
                }}
              >
                전화번호 변경
                <NextArrowWhite/>
              </Button>
              <LoginButton
                background={"#ffffff"}
                context={"회원탈퇴"}
                color={"#7bab6e"}
                borderColor={"#7bab6e"}
                arrowColor={"#7bab6e"}
                handler={() => {
                  setShowDeleteUser(true);
                }}
              />
            </div>
          </div>
        </>
      }
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

export default ChangeInfo;
