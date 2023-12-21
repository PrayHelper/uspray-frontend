import React, { useState, useEffect } from "react";
import SocialLoginLongButton from "../components/SocialLogin/SocialLoginLongButton";
import styled from "styled-components";
import LogoSVG from "../images/logo_image.svg";
import { Link } from "react-router-dom";

const S = {
  SocialLoginWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
  `,
  LogoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 305px);
    margin-bottom: ${(props) => (props.isViewportSmall ? "0px" : "12vh")};
  `,
  LogoImg: styled.img`
    width: 204px;
  `,
  LogoTitle: styled.div`
    color: #75bd62;
    font-size: 40px;
    font-weight: 700;
    line-height: 57.92px;
  `,
  LogoSubTitle: styled.div`
    color: #75bd62;
    font-size: 24px;
    line-height: 34.75px;
  `,
  BottomWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    margin-bottom: 40px;
  `,
  BottomLinks: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
  `,
  BottomLink: styled(Link)`
    text-decoration: none;
    color: #a0a0a0;
    font-size: 12px;
    font-weight: 700;
  `,
  BtnWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
  `,
  IconWrapper: styled.img`
    position: absolute;
    left: 20px;
  `,
  Bar: styled.span`
    width: 1px;
    height: 12px;
    background-color: #cecece;
  `,
};

const SocialLogin = () => {
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallViewport(window.innerHeight < 850);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const continueWithKakao = () => {
    console.log("continueWithKakao");
  };
  const continueWithNaver = () => {
    console.log("continueWithNaver");
  };
  const continueWithApple = () => {
    console.log("continueWithApple");
  };

  return (
    <S.SocialLoginWrapper>
      <S.LogoWrapper isViewportSmall={isSmallViewport}>
        <S.LogoImg src={LogoSVG} alt="logo" />
        <S.LogoTitle>Uspray</S.LogoTitle>
        <S.LogoSubTitle>너에게 기도를, 유스프레이</S.LogoSubTitle>
      </S.LogoWrapper>
      <S.BottomWrapper>
        <S.BtnWrapper>
          <SocialLoginLongButton theme={"kakao"} onClick={continueWithKakao} />
          <SocialLoginLongButton theme={"naver"} onClick={continueWithNaver} />
          <SocialLoginLongButton theme={"apple"} onClick={continueWithApple} />
        </S.BtnWrapper>
        <S.BottomLinks>
          <S.BottomLink to="/signup">회원가입하기</S.BottomLink>
          <S.Bar />
          <S.BottomLink to="/login">로그인하기</S.BottomLink>
          <S.Bar />
          <S.BottomLink
            onClick={() => {
              console.log("!");
            }}
          >
            문의하기
          </S.BottomLink>
        </S.BottomLinks>
      </S.BottomWrapper>
    </S.SocialLoginWrapper>
  );
};

export default SocialLogin;
