import { useEffect, useState } from "react";
import publicapi from "../api/publicapi";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Input from "../components/Input/Input";
import UserHeader from "../components/UserHeader";
import styled from 'styled-components';
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useResetPhoneNumber } from "../hooks/useResetPhoneNumber";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { ReactComponent as NextArrowGray } from "../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../images/ic_next_arrow_white.svg";



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

const ChangePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [verficationNumber, setVerficationNumber] = useState("");
  const [isCetrificated, setIsCertificated] = useState(false);
  const [isCertificateButtonClicked, setIsCertificateButtonClicked] =
    useState(false);
  const [time, setTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { showToast } = useToast({});

  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const certificateNumberRegEx = /^[0-9]{6}$/;

  const isAllValid = isCetrificated && isCertificateButtonClicked;

  const phoneNumberCheck = (phoneNumber) => {
    return phoneNumberRegEx.test(phoneNumber);
  };

  const certificateNumberCheck = (userInfo) => {
    return certificateNumberRegEx.test(userInfo);
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

    setPhoneNumber(formattedValue);
  };

  const certificateNumberChangeHandler = (e) => {
    setCertificateNumber(e.target.value);
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

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = "/settings";
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
      })
    }
  };

  const { mutate } = useResetPhoneNumber({
    phone: phoneNumber.replace(/-/g, ""),
  });

  const resetPhoneNumber = () => {
    mutate(null, {
      onSuccess: (res) => {
        setShowModal(true);
        console.log(res);
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img
              src="images/ic_phone.svg"
              alt="phone_icon"
              style={{ marginTop: "8px" }}
            />
            <div
              style={{
                fontSize: "20px",
                color: "#7BAB6E",
                fontWeight: "700",
                paddingBottom: "2px",
              }}>
              전화번호가 재설정 되었습니다.
            </div>
            <div
              style={{
                marginTop: "2px",
                marginBottom: "28px",
              }}>
              바뀐 전화번호를 기억해둘게요!
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "8px",
              }}>
              <ModalButton1 onClick={handleCloseModal}>확인</ModalButton1>
            </div>
          </ModalContent>
        </>
      )}
      <UserHeader>전화번호 변경</UserHeader>
      <div
        style={{
          width: "100%",
          gap: "24px",
          marginTop: "64px",
        }}>
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}>
          <Input
            label="전화번호"
            value={phoneNumber}
            onChangeHandler={phoneNumberChangeHandler}
            description={
              <Button
                buttonSize={ButtonSize.NORMAL}
                buttonTheme={
                  phoneNumberCheck(phoneNumber)
                    ? ButtonTheme.GREEN
                    : ButtonTheme.GRAY
                }
                disabled={!phoneNumberCheck(phoneNumber) || time}
                handler={() => {
                  phoneNumVerfication(phoneNumber.replace(/-/g, ""));
                  setIsCertificated(false);
                  setIsCertificateButtonClicked(false);
                  setCertificateNumber("");
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
                : certificateNumber
            }
            isError={
              (!isCetrificated && isCertificateButtonClicked) || time === 0
            }
            description={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {time !== "" && <span>{changeTimeFormat(time)}</span>}
                <Button
                  buttonSize={ButtonSize.NORMAL}
                  buttonTheme={
                    certificateNumberCheck(certificateNumber)
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
                    if (isCertificationNumberValid(certificateNumber)) {
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
                  {isCetrificated || isCertificateButtonClicked
                    ? "완료"
                    : "확인"}
                </Button>
              </div>
            }
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              width: "calc(100% - 32px)",
              display: "flex",
              flexDirection: "column",
            }}>
            <Button
              disabled={!isAllValid}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              handler={() => {
                resetPhoneNumber();
              }}>
              재설정하기
              {isAllValid ? <NextArrowWhite/> : <NextArrowGray/>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePhoneNumber;
