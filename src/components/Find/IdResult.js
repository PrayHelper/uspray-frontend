import React, { useState } from "react";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import publicapi from "../../api/publicapi";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
const Title = styled.div`
  margin: 0 auto;
  color: #7bab6e;
  font-weight: bold;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  margin: 0 16px;
  margin-top: 66px;
  margin-bottom: 12px;
  border-bottom: 1px solid #d0e8cb;
  contents-align: center;
`;
const BoxSetting = styled.div`
  color: #7bab6e;
  text-align: center;
  margin-bottom: 16px;

  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BoxSettingError = styled.div`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 16px;

  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BoxError = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  margin: 0 16px;
  margin-top: 66px;
  margin-bottom: 12px;
  border-bottom: 1px solid #ff6b6b;
  contents-align: center;
  width: calc(100% - 48px);
`;
const BoldText = styled.span`
  font-weight: bold;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
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
  z-index: 101;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const IdResult = ( {userData} ) => {
  const [id, setText] = useState("");
  const [name, setText1] = useState("");
  const [isValid, setIsValid] = useState(true);

  const showId = async () => {
    console.log(userData);
    const api = "/user/find/id";
    const data = {
      name: userData.name,
      phone: userData.phoneNumber.replace(/-/g, ""),
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        setText(res.data.message);
        setText1(userData.name);
        console.log(res.data);
      }
    } catch (e) {
      setIsValid(false);
      console.log(e);
    }
  };

  useEffect(() => {
    showId();
  }, []);

  return (
    <AnimationContainer>
      <StyledHeader>
        <Title>아이디 찾기</Title>
      </StyledHeader>
      {isValid ? (
        <Box>
          <BoxSetting>
            {name}님의 아이디는 <BoldText children={id} />
            입니다.
          </BoxSetting>
        </Box>
      ) : (
        <BoxError>
          <BoxSettingError children="해당 정보와 일치하는 유저가 없습니다." />
        </BoxError>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          width: "calc(100% - 48px)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignSelf: "center",
        }}
      >
        <Link to="/findPW" style={{ textDecoration: "none" }}>
          <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.WHITE}>
            비밀번호 찾기
          </Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GREEN}>
            메인화면으로 이동
          </Button>
        </Link>
      </div>
    </AnimationContainer>
  );
};

export default IdResult;
