import ToggleButton from "../components/ToggleButton";
import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import InputBirth from "../components/InputBirth";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Input from "../components/Input/Input";
import styled from "styled-components";
import { ToastTheme } from "../components/Toast/Toast";
import publicapi from "../api/publicapi";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { Overlay } from "../components/Overlay/Overlay";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import useToast from "../hooks/useToast";
import { ReactComponent as NextArrowGray } from "../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../images/ic_next_arrow_white.svg";
import useSignupTos from "../hooks/useSignupTos";
import SignupTos from "../components/SignupTos/SignupTos";

let init = 0;

const Signup = () => {
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
  const [gender, setGender] = useState("");
  const [invalidIdInfo, setInvalidIdInfo] = useState("");
  const [invalidPwdInfo, setInvalidPwdInfo] = useState("");
  const [invalidMatchingPwdInfo, setInvalidMatchingPwdInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [time, setTime] = useState("");
  const [isCetrificated, setIsCertificated] = useState(false);
  const [isCertificateButtonClicked, setIsCertificateButtonClicked] =
    useState(false);
  const [
    isPhoneNumVerficationButtonClicked,
    setIsPhoneNumVerficationButtonClicked,
  ] = useState(false);
  const userInfoForCheck = { ...userInfo };
  delete userInfoForCheck.year;
  delete userInfoForCheck.month;
  delete userInfoForCheck.day;

  const checkEmptyUserInfoValue = Object.values(userInfoForCheck).some(
    (data) => data === ""
  );

  const { isAgreed, toggleAll, toggleHandler, isAgreedAll } = useSignupTos();

  const { showToast } = useToast({});

  const navigate = useNavigate();

  const isAllValid =
    !invalidIdInfo &&
    !invalidPwdInfo &&
    !invalidMatchingPwdInfo &&
    isCetrificated &&
    isCertificateButtonClicked &&
    isAgreedAll &&
    !checkEmptyUserInfoValue;

  const idRegEx = /^[a-z0-9]{6,15}$/;
  const pwdRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;
  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const certificateNumberRegEx = /^[0-9]{6}$/;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const idCheck = (userInfo) => {
    return idRegEx.test(userInfo);
  };

  const pwdCheck = (userInfo) => {
    return pwdRegEx.test(userInfo);
  };

  const phoneNumberCheck = (userInfo) => {
    return phoneNumberRegEx.test(userInfo);
  };

  const certificateNumberCheck = (userInfo) => {
    return certificateNumberRegEx.test(userInfo);
  };

  const isIdDuplicated = async (uid) => {
    const api = `/auth/dup-check/${uid}`;
    try {
      const res = await publicapi.get(api);
      if (res.status === 200) {
        return res.data.data.duplicate;
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const phoneNumVerfication = async (phoneNumber) => {
    const api = "/sms/send";
    const data = {
      to: phoneNumber,
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        showToast({
          message: "인증번호가 전송되었습니다.",
          theme: ToastTheme.SUCCESS,
        });
        setRequestId(res.data.data.requestId);
        setTime("180");
      }
    } catch (e) {
      showToast({ message: "error occured", theme: ToastTheme.ERROR });
    }
  };

  const signup = async () => {
    const api = "/auth/signup";
    const data = {
      userId: userInfo.id,
      password: userInfo.pwd,
      name: userInfo.name,
      phone: userInfo.phoneNumber.replace(/-/g, ""),
    };

    if (gender) data.gender = gender === "여자" ? "female" : "male";
    if (userInfo.year && userInfo.month && userInfo.day)
      data.birth = userInfo.year + "-" + userInfo.month + "-" + userInfo.day;

    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        showToast({
          message: "회원가입이 성공적으로 완료되었습니다.",
          theme: ToastTheme.SUCCESS,
        });
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.message) {
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
      }
    }
  };

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

  const pwdChangeHandler = (e) => {
    setUserInfo({ ...userInfo, pwd: e.target.value });
    if (!pwdCheck(e.target.value)) {
      setInvalidPwdInfo("8-16자의 영문 대소문자, 숫자, 특수문자만 사용 가능");
      return;
    }
    if (userInfo.matchingPwd || invalidMatchingPwdInfo) {
      if (e.target.value !== userInfo.matchingPwd) {
        setInvalidMatchingPwdInfo("비밀번호가 서로 다릅니다.");
      } else {
        setInvalidMatchingPwdInfo("");
      }
    }
    setInvalidPwdInfo("");
  };

  const matchingPwdChangeHandler = (e) => {
    setUserInfo({ ...userInfo, matchingPwd: e.target.value });
    if (userInfo.pwd !== e.target.value) {
      setInvalidMatchingPwdInfo("비밀번호가 서로 다릅니다.");
      return;
    }
    setInvalidMatchingPwdInfo("");
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

  const yearChangeHandler = (e) => {
    setUserInfo({ ...userInfo, year: e.target.value.slice(0, 4) });
  };

  const monthChangeHandler = (e) => {
    setUserInfo({ ...userInfo, month: e.target.value.slice(0, 2) });
  };

  const dayChangeHandler = (e) => {
    setUserInfo({ ...userInfo, day: e.target.value.slice(0, 2) });
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

  const isCertificationNumberValid = async (certificateNumber) => {
    const api = "/sms/verification";
    const data = {
      requestId: requestId,
      smsConfirmNum: certificateNumber,
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        showToast({
          message: "인증에 성공하였습니다.",
          theme: ToastTheme.SUCCESS,
        });
        setIsCertificated(true);
        return true;
      }
    } catch (e) {
      if (e.response.status === 400) {
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
        setIsCertificated(false);
      }
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
    <SignupPageWrapper>
      <UserHeader>회원가입</UserHeader>
      <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
      <Modal
        isModalOn={showModal}
        iconSrc={"images/icon_notice.svg"}
        iconAlt={"icon_notice"}
        mainContent={"이름은 실명으로 설정해주세요!"}
        subContent={"기도제목 공유 시 이름으로 전달됩니다."}
        btnContent={"네, 그렇게 할게요."}
        onClickBtn={handleCloseModal}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}
      >
        <Input
          label="아이디*"
          onChangeHandler={idChangeHandler}
          value={userInfo.id}
          isError={!!invalidIdInfo}
          description={invalidIdInfo}
        />
        <Input
          label="비밀번호*"
          type="password"
          onChangeHandler={pwdChangeHandler}
          value={userInfo.pwd}
          isError={!!invalidPwdInfo}
          description={invalidPwdInfo}
        />
        <Input
          label="비밀번호 확인*"
          type="password"
          onChangeHandler={matchingPwdChangeHandler}
          value={userInfo.matchingPwd}
          isError={!!invalidMatchingPwdInfo}
          description={invalidMatchingPwdInfo}
        />
        <Input
          label="이름*"
          onChangeHandler={nameChangeHandler}
          value={userInfo.name}
          isError={false}
          description=""
          onFocusHandler={nameFocusHandler}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: "12px",
              color: "#7BAB6E",
              paddingLeft: "16px",
              position: "absolute",
              top: "-18px",
            }}
          >
            성별
          </div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            <ToggleButton contents="남자" item={gender} setter={setGender} />
            <ToggleButton contents="여자" item={gender} setter={setGender} />
          </div>
        </div>
        <InputBirth
          yearValue={userInfo.year}
          monthValue={userInfo.month}
          dayValue={userInfo.day}
          yearChangeHandler={yearChangeHandler}
          monthChangeHandler={monthChangeHandler}
          dayChangeHandler={dayChangeHandler}
        />
        <Input
          label="전화번호*"
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
                setIsPhoneNumVerficationButtonClicked(true);
              }}
            >
              {time ? "진행 중" : "전송"}
            </Button>
          }
        />
        <Input
          label="인증번호*"
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
                  !isPhoneNumVerficationButtonClicked ||
                  !certificateNumberCheck(userInfo.certificateNumber)
                }
                handler={() => {
                  setIsCertificateButtonClicked(true);
                  isCertificationNumberValid(userInfo.certificateNumber);
                }}
              >
                {isCetrificated || isCertificateButtonClicked ? "완료" : "확인"}
              </Button>
            </div>
          }
        />
        <SignupTos {...{ isAgreed, toggleHandler, toggleAll, isAgreedAll }} />
        <Button
          // disabled={!isAllValid}
          buttonSize={ButtonSize.LARGE}
          buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
          handler={() => {
            signup();
          }}
        >
          회원가입
          {isAllValid ? <NextArrowWhite /> : <NextArrowGray />}
        </Button>
      </div>
    </SignupPageWrapper>
  );
};

export default Signup;

const SignupPageWrapper = styled.div`
  width: 100%;
  background-color: var(--color-white);
`;
