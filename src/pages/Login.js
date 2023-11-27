// TODO: 파일명, 컴포넌트명 수정(첫화면이 이렇게 변경되면 Login은 적절하지 않게 됨)

import styled from "styled-components";
import SocialLoginBtn from "../components/SocialLoginBtn";
import LogoSVG from "../images/logo_image.svg";
import { useNavigate, Link } from "react-router-dom";

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
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  const {
    REACT_APP_KAKAO_API_KEY,
    REACT_APP_KAKAO_CLIENT_SECRET,
    REACT_APP_KAKAO_URI,
    REACT_APP_API_INTG,
    REACT_APP_NAVER_API_KEY,
    REACT_APP_NAVER_URI,
  } = process.env;

  let navigate = useNavigate();

  const kakaoLink = () => {
    window.open(
      `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_API_KEY}&redirect_uri=${REACT_APP_KAKAO_URI}&response_type=code`
    );
  };

  const naverLink = () => {
    window.open(
      `https://nid.naver.com/oauth2.0/authorize?client_id=${REACT_APP_NAVER_API_KEY}&redirect_uri=${REACT_APP_NAVER_URI}&response_type=code`
    );
  };

  const navigateTo = (to) => () => {
    navigate(to);
  };

  return (
    <S.SocialLoginWrapper>
      <S.LogoWrapper>
        <S.LogoImg src={LogoSVG} alt="logo" />
        <S.LogoTitle>Uspray</S.LogoTitle>
        <S.LogoSubTitle>너에게 기도를, 유스프레이</S.LogoSubTitle>
      </S.LogoWrapper>
      <S.BottomWrapper>
        <S.BtnWrapper>
          <SocialLoginBtn onClick={kakaoLink} theme={"kakao"}>
            <S.IconWrapper src="images/ic_kakao.svg" />
            카카오로 계속하기
          </SocialLoginBtn>
          <SocialLoginBtn onClick={naverLink} theme={"naver"}>
            <S.IconWrapper src="images/ic_naver.svg" />
            네이버로 계속하기
          </SocialLoginBtn>
          <SocialLoginBtn theme={"apple"}>
            <S.IconWrapper src="images/ic_apple.svg" />
            Apple로 계속하기
          </SocialLoginBtn>
        </S.BtnWrapper>
        <S.BottomLinks>
          <S.BottomLink to="/signup">회원가입하기</S.BottomLink>
          <S.Bar />
          <S.BottomLink to="/login">로그인하기</S.BottomLink>
          <S.Bar />
          <S.BottomLink
            onClick={() => {
              alert("!");
            }}>
            문의하기
          </S.BottomLink>
        </S.BottomLinks>
      </S.BottomWrapper>
    </S.SocialLoginWrapper>
  );
};

export default SocialLogin;
