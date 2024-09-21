import { useState } from "react";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import Input from "../Input/Input";
import UserHeader from "../UserHeader";
import styled, { keyframes } from "styled-components";
import BlackScreen from "../BlackScreen/BlackScreen";
import publicapi from "../../api/publicapi";
import { useNavigate } from "react-router-dom";

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
  border-radius: 16px;
  padding: 16px;
  color: #7bab6e;
  z-index: 500;
`;

const AnimationContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const ModalButton1 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #ffffff;
  font-size: 18px;
`;
const PwResult = ({ id }) => {
  const [pw, setPw] = useState("");
  const [matchingPw, setMatchingPw] = useState("");
  const [invalidPwInfo, setInvalidPwInfo] = useState("");
  const [invalidMatchingPwInfo, setInvalidMatchingPwInfo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  const isAllValid =
    pw && matchingPw && !invalidPwInfo && !invalidMatchingPwInfo;

  const pwRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const pwCheck = (pw) => {
    return pwRegEx.test(pw);
  };

  const pwChangeHandler = (e) => {
    setPw(e.target.value);
    if (!pwCheck(e.target.value)) {
      setInvalidPwInfo("8-16자의 영문 대소문자, 숫자, 특수문자만 사용 가능");
      return;
    }
    if (matchingPw || invalidMatchingPwInfo) {
      if (e.target.value !== matchingPw) {
        setInvalidMatchingPwInfo("비밀번호가 서로 다릅니다.");
      } else {
        setInvalidMatchingPwInfo("");
      }
    }
    setInvalidPwInfo("");
  };

  const matchingPwChangeHandler = (e) => {
    setMatchingPw(e.target.value);
    if (pw !== e.target.value) {
      setInvalidMatchingPwInfo("비밀번호가 서로 다릅니다.");
      return;
    }
    setInvalidMatchingPwInfo("");
  };

  const resetFindPw = async () => {
    const api = `/auth/change-pw`;
    const data = {
      id: id,
      password: pw,
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        setShowModal(true);
        console.log(res.data);
      }
    } catch (e) {
      setShowModal(false);
      console.log(e);
    }
  };

  return (
    <AnimationContainer>
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img
              src="images/lock.svg"
              alt="lock"
              style={{ marginTop: "8px" }}
            />
            <div
              style={{
                fontSize: "24px",
                color: "#7BAB6E",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              비밀번호가 변경되었습니다.
            </div>
            <div
              style={{
                fontSize: "18px",
                marginTop: "2px",
                marginBottom: "28px",
                letterSpacing: "-0.02em",
              }}
            >
              바뀐 비밀번호로 로그인하세요.
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "8px",
              }}
            >
              <ModalButton1 onClick={handleCloseModal}>확인</ModalButton1>
            </div>
          </ModalContent>
        </>
      )}
      <UserHeader>비밀번호 재설정</UserHeader>
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
          <Input
            label="비밀번호"
            type="password"
            value={pw}
            onChangeHandler={pwChangeHandler}
            isError={!!invalidPwInfo}
            description={invalidPwInfo}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            value={matchingPw}
            onChangeHandler={matchingPwChangeHandler}
            isError={!!invalidMatchingPwInfo}
            description={invalidMatchingPwInfo}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              width: "calc(100% - 32px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              disabled={!isAllValid}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              isArrow={true}
              handler={() => {
                resetFindPw();
              }}
            >
              비밀번호 변경하기
            </Button>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default PwResult;
