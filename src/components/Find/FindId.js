import React, { useEffect, useRef, useState } from "react";
import UserHeader from "../UserHeader";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import Input from "../Input/Input";
import styled from "styled-components";
import publicapi from "../../api/publicapi";
import IdResult from "./IdResult";
import useToast from "../../hooks/useToast";
import { ToastTheme } from "../Toast/Toast";
import { ReactComponent as NextArrowGray } from "../../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../../images/ic_next_arrow_white.svg";
let init = 0;

const SubLink = styled.a`
  color: #7bab6e;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const FindId = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [verficationNumber, setVerficationNumber] = useState("");
  const [time, setTime] = useState("");
  const [showResultPage, setShowRestultPage] = useState(false);
  const [isCetrificated, setIsCertificated] = useState(false);
  const [isCertificateButtonClicked, setIsCertificateButtonClicked] =
    useState(false);
  const { showToast } = useToast({});

  const moveToResult = () => {
    setShowRestultPage(true);
  };
  const userData = {
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber.replace(/-/g, ""),
  };

  const isAllValid = isCetrificated && isCertificateButtonClicked;

  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const certificateNumberRegEx = /^[0-9]{6}$/;

  const phoneNumberCheck = (userInfo) => {
    return phoneNumberRegEx.test(userInfo);
  };

  const certificateNumberCheck = (userInfo) => {
    return certificateNumberRegEx.test(userInfo);
  };

  const phoneNumVerfication = async (phoneNumber) => {
    const api = "/admin/sms";
    const data = {
      phone: phoneNumber,
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        showToast({ message: "인증번호가 전송되었습니다.", theme: ToastTheme.SUCCESS });
        console.log(res.data.code);
        setVerficationNumber(res.data.code);
        setTime("180");
      }
    } catch (e) {
      showToast({ message: "error occured", theme: ToastTheme.ERROR });
    }
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
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {showResultPage && <IdResult userData={userData} />}
      <UserHeader children={"아이디 찾기"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}>
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
                  (isCetrificated && isCertificateButtonClicked) || time === 0
                }
                handler={() => {
                  setIsCertificateButtonClicked(true);
                  if (isCertificationNumberValid(userInfo.certificateNumber)) {
                    showToast({
                      message: "인증에 성공하였습니다.",
                      theme: ToastTheme.SUCCESS,
                    });
                  } else {
                    showToast({
                      message: "인증번호가 일치하지 않습니다.",
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
            // disabled={!isAllValid}
            buttonSize={ButtonSize.LARGE}
            buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
            handler={() => {
              moveToResult();
            }}>
            아이디 찾기
            {isAllValid ? <NextArrowWhite/> : <NextArrowGray/>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindId;
