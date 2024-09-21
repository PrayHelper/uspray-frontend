import Header from "../components/Header/Header";
import styled from "styled-components";
import { useState } from "react";
import SettingToggle from "../components/SettingToggle/SettingToggle";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
import { setRef } from "@mui/material";
import useAuthorized from "../hooks/useAuthorized";
import useSleep from "../hooks/useSleep";
import Modal from "../components/Modal/Modal";
import Overlay from "../components/Overlay/Overlay";
import ToS from "./ToS";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNotification } from "../hooks/useNotification";
import { useCheckLogin } from "../hooks/useCheckLogin";
import ChangeInfoSocial from "../components/ChangeInfo/ChangeInfoSocial";

const Container = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-y: ${(props) => (props.isModalOn ? "hidden" : "auto")};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #f0f0f0;
  margin-top: 65px;
  margin-bottom: 65px;
`;

const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  color: #a0a0a0;
  background-color: white;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  padding-left: 16px;
  color: #333333;
`;

const StyledItem = styled.div`
  transition: all 0.3s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: white;

  &:active {
    transition: all 0.2s;
    ${(props) =>
      props.noActive
        ? `filter: brightness(1);
        transform: scale(1);`
        : `filter: brightness(0.95);
        transform: scale(0.98);`}
  }
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

const ModalButton1 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #f0f0f0;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #808080;
  font-size: 18px;
`;

const ModalButton2 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #ffffff;
  font-size: 18px;
`;

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOverlayOn, setIsOverlayOn] = useState(false);
  const [information, setInformation] = useState(null);
  const { setRefreshToken } = useAuthToken();
  const { isNotifiedData } = useNotification();
  const navigate = useNavigate();
  const { isSocialLogin } = useCheckLogin();

  const openModalHandler = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const movePageHandler = () => {
    if (isSocialLogin.social) navigate("/changeInfoSocial");
    else navigate("/checkInfo");
  };

  const logout = async () => {
    setRefreshToken("");
    window.location.reload();
  };

  const moveToKakao = () => {
    window.open("https://pf.kakao.com/_UgxhYxj");
  };

  const moveToInsta = () => {
    window.open("https://www.instagram.com/_uspray/");
  };

  function showInformation(page) {
    setInformation(page);
    setIsOverlayOn(true);
  }

  const moveToToS = () => {
    showInformation(<ToS setIsOverlayOn={setIsOverlayOn} />);
  };

  const moveToPrivacyPolicy = () => {
    showInformation(<PrivacyPolicy setIsOverlayOn={setIsOverlayOn} />);
  };

  return (
    <Container isModalOn={showModal}>
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
          <Modal
            isModalOn={showModal}
            iconSrc={"images/ic_logout.svg"}
            iconAlt={"icon_logout"}
            mainContent={"로그아웃 하시겠습니까?"}
            subContent={"안전하게 로그아웃을 진행해 드릴게요."}
            btnContent={"로그아웃"}
            btnContent2={"취소"}
            onClickBtn={logout}
            onClickBtn2={handleCloseModal}
            modalTheme={0}
          />
        </>
      )}
      <Header>설정</Header>
      <Wrapper>
        <WhiteBox style={{ paddingTop: "-10px" }}>
          <SubTitle>계정</SubTitle>
          <StyledItem onClick={movePageHandler}>
            <div>회원정보 변경</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
          <StyledItem onClick={openModalHandler}>
            <div>로그아웃</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>알림</SubTitle>
          <StyledItem noActive={true}>
            <div>기도 시간 - 오전 8시</div>
            <SettingToggle
              isAbledData={isNotifiedData.firstNotiAgree}
              id={0}
            ></SettingToggle>
          </StyledItem>
          <StyledItem noActive={true}>
            <div>다른 사람이 내 기도제목을 기도 했을 때</div>
            <SettingToggle
              isAbledData={isNotifiedData.secondNotiAgree}
              id={1}
            ></SettingToggle>
          </StyledItem>
          <StyledItem noActive={true}>
            <div>다른 사람이 내 기도제목을 공유 받았을 때</div>
            <SettingToggle
              isAbledData={isNotifiedData.thirdNotiAgree}
              id={2}
            ></SettingToggle>
          </StyledItem>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>문의</SubTitle>
          <StyledItem onClick={moveToKakao}>
            <div>카카오톡으로 문의</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
          <StyledItem onClick={moveToInsta}>
            <div>인스타그램으로 문의</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>서비스 정보</SubTitle>
          <StyledItem onClick={moveToToS}>
            <div>이용 약관 및 정책</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
          <StyledItem onClick={moveToPrivacyPolicy}>
            <div>개인정보 처리 방침</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
          <StyledItem noActive={true}>
            <div>현재 서비스 버전 확인</div>
            <div
              style={{ color: "#7BAB6E", fontWeight: "700", fontSize: "15px" }}
            >
              2.14.0
            </div>
          </StyledItem>
        </WhiteBox>
      </Wrapper>
      {isOverlayOn && (
        <Overlay isOverlayOn={isOverlayOn}>{information}</Overlay>
      )}
    </Container>
  );
};

export default Settings;
