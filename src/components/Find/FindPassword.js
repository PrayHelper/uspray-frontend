import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import publicapi from "../../api/publicapi";
import UserHeader from "../UserHeader";
import Button, { ButtonSize, ButtonTheme } from "..//Button/Button";
import Input from "../Input/Input";
import { ToastTheme } from "../Toast/Toast";
import PwResult from "./PwResult";
import PwError from "./PwError";
import useToast from "../../hooks/useToast";
import { ReactComponent as NextArrowGray } from "../../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../../images/ic_next_arrow_white.svg";

let init = 0;

const SubLink = styled.a`
  color: #7bab6e;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

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

const ModalButton = styled.button`
  width: 100%;
  height: 66px;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 20px 0;
  color: #ffffff;
  font-size: 18px;
`;

const FindPassword = () => {
  const [useToken, setUseToken] = useState("");
  const [showResultPage, setShowRestultPage] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    matchingPwd: "",
    name: "",
    year: "",
    month: "",
    day: "",
    phoneNumber: "",
    certificateNumber: "",
  });
  const [invalidIdInfo, setInvalidIdInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verficationNumber, setVerficationNumber] = useState("");
  const [time, setTime] = useState("");
  const [isCetrificated, setIsCertificated] = useState(false);
  const [isCertificateButtonClicked, setIsCertificateButtonClicked] =
    useState(false);
  const [
    isPhoneNumVerficationButtonClicked,
    setIsPhoneNumVerficationButtonClickClick,
  ] = useState(false);

  const { showToast } = useToast({});

  const isAllValid = isCetrificated && isCertificateButtonClicked;

  const idRegEx = /^[a-z0-9]{6,15}$/;
  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const certificateNumberRegEx = /^[0-9]{6}$/;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const idCheck = (userInfo) => {
    return idRegEx.test(userInfo);
  };

  const phoneNumberCheck = (userInfo) => {
    return phoneNumberRegEx.test(userInfo);
  };

  const certificateNumberCheck = (userInfo) => {
    return certificateNumberRegEx.test(userInfo);
  };

  const isIdDuplicated = async (uid) => {
    const api = `/user/dup_check/${uid}`;
    try {
      const res = await publicapi.get(api);
      if (res.status === 200) {
        return res.data.dup;
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const phoneNumVerfication = async (phoneNumber) => {
    const api = "/admin/sms";
    const data = {
      phone: phoneNumber,
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        showToast({
          message: "인증번호가 전송되었습니다.",
          theme: ToastTheme.SUCCESS,
        });
        console.log(res.data.code);
        setVerficationNumber(res.data.code);
        setTime("180");
      }
    } catch (e) {
      showToast({
        message: "error occured",
        theme: ToastTheme.ERROR,
      });
    }
  };

  const findPassword = async () => {
    const api = "/user/check/inform";
    const data = {
      id: userInfo.id,
      phone: userInfo.phoneNumber.replace(/-/g, ""),
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        if (res.data.message === true) {
          console.log(res.data);
          setUseToken(res.data.token);
          setShowRestultPage(true);
        } else {
          setShowErrorPage(true);
        }
      }
    } catch (e) {
      showToast({
        message: "error occured",
        theme: ToastTheme.ERROR,
      });
    }
  };
  const pwToken = useToken;
  const idChangeHandler = async (e) => {
    setUserInfo({ ...userInfo, id: e.target.value });
    if (!idCheck(e.target.value)) {
      setInvalidIdInfo("6-15자의 영문 소문자, 숫자만 사용 가능");
      return;
    }
    if (await isIdDuplicated(e.target.value)) {
      setInvalidIdInfo("아이디가 중복되었습니다.");
      return;
    }
    setInvalidIdInfo("");
  };

  const nameChangeHandler = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const nameFocusHandler = () => {
    if (init === 0) {
      setShowModal(true);
      init = 1;
    }
  };

  const phoneNumberChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    let formattedValue = "";

    if (value.length > 3) {
      formattedValue += value.substring(0, 3) + "-";
    }

    if (value.length > 7) {
      formattedValue += value.substring(3, 7) + "-";
      formattedValue += value.substring(7, 11);
    } else if (value.length > 3) {
      formattedValue += value.substring(3, 7);
    } else {
      formattedValue += value;
    }

    setUserInfo({ ...userInfo, phoneNumber: formattedValue });
  };

  const certificateNumberChangeHandler = (e) => {
    setUserInfo({ ...userInfo, certificateNumber: e.target.value });
  };

  const isCertificationNumberValid = (certificateNumber) => {
    if (verficationNumber == certificateNumber) {
      setIsCertificated(true);
      return true;
    } else {
      setIsCertificated(false);
      return false;
    }
  };

  const changeTimeFormat = (time) => {
    let minutes = parseInt(time / 60);
    let seconds = time % 60;
    let result;
    if (parseInt(minutes / 10) === 0) minutes = `0${minutes}`;
    if (parseInt(seconds / 10) === 0) seconds = `0${seconds}`;
    result = `${minutes}:${seconds}`;
    return result;
  };

  useEffect(() => {
    if (time === "") return;
    if (isCetrificated && isCertificateButtonClicked) {
      setTime("");
      return;
    }
    const id = setInterval(() => {
      if (time > 0) setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [time]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        position: "relative",
        flexDirection: "column",
      }}>
      {showResultPage && <PwResult pwToken={pwToken} />}
      {showErrorPage && <PwError />}
      <UserHeader children={"비밀번호 찾기"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}>
        <Input
          label="아이디"
          onChangeHandler={idChangeHandler}
          value={userInfo.id}
        />
        <Input
          label="이름"
          onChangeHandler={nameChangeHandler}
          value={userInfo.name}
          isError={false}
          description=""
          onFocusHandler={nameFocusHandler}
        />
        <Input
          label="전화번호"
          onChangeHandler={phoneNumberChangeHandler}
          value={userInfo.phoneNumber}
          isError={false}
          description={
            <Button
              buttonSize={ButtonSize.NORMAL}
              buttonTheme={
                phoneNumberCheck(userInfo.phoneNumber)
                  ? ButtonTheme.GREEN
                  : ButtonTheme.GRAY
              }
              disabled={!phoneNumberCheck(userInfo.phoneNumber) || time}
              handler={() => {
                phoneNumVerfication(userInfo.phoneNumber.replace(/-/g, ""));
                setIsCertificated(false);
                setIsCertificateButtonClicked(false);
                setUserInfo({ ...userInfo, certificateNumber: "" });
                setIsPhoneNumVerficationButtonClickClick(true);
              }}>
              {time ? "진행 중" : "전송"}
            </Button>
          }
        />
        <Input
          label="인증번호"
          onChangeHandler={certificateNumberChangeHandler}
          value={
            isCetrificated && isCertificateButtonClicked
              ? "인증에 성공하였습니다."
              : time === 0
              ? "인증번호가 만료되었습니다."
              : userInfo.certificateNumber
          }
          isError={
            (!isCetrificated && isCertificateButtonClicked) || time === 0
          }
          description={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {time !== "" && <span>{changeTimeFormat(time)}</span>}
              <Button
                buttonSize={ButtonSize.NORMAL}
                buttonTheme={
                  certificateNumberCheck(userInfo.certificateNumber)
                    ? !isCetrificated && isCertificateButtonClicked
                      ? time === 0
                        ? ButtonTheme.GRAY
                        : ButtonTheme.RED
                      : time === 0
                      ? ButtonTheme.GRAY
                      : ButtonTheme.GREEN
                    : ButtonTheme.GRAY
                }
                disabled={
                  (isCetrificated && isCertificateButtonClicked) ||
                  time === 0 ||
                  !isPhoneNumVerficationButtonClicked
                }
                handler={() => {
                  console.log(isCetrificated && isCertificateButtonClicked);
                  console.log(time === 0);
                  setIsCertificateButtonClicked(true);
                  if (isCertificationNumberValid(userInfo.certificateNumber)) {
                    showToast({
                      message: "인증에 성공하였습니다.",
                      theme: ToastTheme.SUCCESS,
                    });
                  } else {
                    showToast({
                      message: "인증에 실패하였습니다.",
                      theme: ToastTheme.ERROR,
                    });
                  }
                }}>
                {isCetrificated || isCertificateButtonClicked ? "완료" : "확인"}
              </Button>
            </div>
          }
        />

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            width: "calc(100% - 48px)",
            display: "flex",
            flexDirection: "column",
          }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <SubLink href="http://pf.kakao.com/_UgxhYxj">
              전화번호를 변경하셨나요?
            </SubLink>
          </div>
          <Button
            disabled={!isAllValid}
            buttonSize={ButtonSize.LARGE}
            buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
            handler={() => {
              findPassword();
            }}>
            비밀번호 찾기
            {isAllValid ? <NextArrowWhite/> : <NextArrowGray/>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
