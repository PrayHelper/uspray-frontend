import { useState } from "react";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import Input from "../Input/Input";
import UserHeader from "../UserHeader";
import styled from "styled-components";
import BlackScreen from "../BlackScreen/BlackScreen";
import { useResetPw } from "../../hooks/useResetPw";
import Modal from "../Modal/Modal";
import { ReactComponent as NextArrowGray } from "../../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../../images/ic_next_arrow_white.svg";

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
  color: #7bab6e;
  z-index: 500;
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

const ChangePw = ({ setShowChangePw }) => {
  const [pw, setPw] = useState("");
  const [matchingPw, setMatchingPw] = useState("");
  const [invalidPwInfo, setInvalidPwInfo] = useState("");
  const [invalidMatchingPwInfo, setInvalidMatchingPwInfo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = "/settings";
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

  const { mutate } = useResetPw({
    password: pw,
  });

  const resetPw = () => {
    mutate(null, {
      onSuccess: (res) => {
        setShowModal(true);
        //console.log(res);
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  return (
    <Wrapper>
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
          <Modal
            // isModalOn={showModal}
            iconSrc={"images/lock.svg"}
            iconAlt={"lock"}
            mainContent={"비밀번호가 변경되었습니다."}
            subContent={"바뀐 비밀번호로 로그인하세요."}
            btnContent={"확인"}
            onClickBtn={handleCloseModal}
          />
        </>
      )}
      <UserHeader back={() => setShowChangePw(false)}>비밀번호 변경</UserHeader>
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
              handler={() => {
                resetPw();
              }}
            >
              재설정하기
              {isAllValid ? <NextArrowWhite /> : <NextArrowGray />}
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  z-index: 101;
`;

export default ChangePw;
