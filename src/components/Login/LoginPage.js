import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import publicapi from "../../api/publicapi";
import Input from "../Input/Input";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import Toast, { ToastTheme } from "../Toast/Toast";
import useFlutterWebview from "../../hooks/useFlutterWebview";
import useAuthToken from "../../hooks/useAuthToken";
import { useMutation } from "react-query";
import useAuthorized from "../../hooks/useAuthorized";

import LogoSVG from "../../images/logo_image.svg";
import useToast from "../../hooks/useToast";
import { ReactComponent as NextArrowGray } from "../../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../../images/ic_next_arrow_white.svg";
import useApi from "../../hooks/useApi";
import SocialLoginCircleButton from "../SocialLogin/SocialLoginCircleButton";
import Modal from "../Modal/Modal";
import BlackScreen from "../BlackScreen";

const useSendDeviceToken = () => {
  const { postFetcher } = useApi();
  return useMutation(
    async (data) => {
      return await postFetcher("/member/fcm-token", data);
    },

    {
      onError: (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );
};

const LoginPage = () => {
  const [idValue, setIdValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken } =
    useAuthToken();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const { isMobile, getDeviceToken, storeAuthToken } = useFlutterWebview();

  const { showToast } = useToast({});

  const onChangeId = (event) => {
    setIdValue(event.target.value);
  };
  const onChangePwd = (event) => {
    setPwdValue(event.target.value);
  };

  const { mutate: sendDeviceToken } = useSendDeviceToken();
  const { setAutorized } = useAuthorized();

  const login = async () => {
    const api = `/auth/login`;
    const data = {
      userId: idValue,
      password: pwdValue,
    };
    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        if (isMobile()) {
          const deviceToken = await getDeviceToken();
          alert("hi");
          sendDeviceToken(
            {
              fcmToken: deviceToken,
            },
            {
              onSuccess: (res) => console.log(res.status),
              onError: (e) => console.log(e.response.status),
            }
          );
        } else {
          showToast({
            message: "푸쉬 알림은 모바일에서만 받을 수 있습니다.",
            theme: ToastTheme.ERROR,
          });
        }

        navigate("/main");
        setAutorized();

        setAccessToken(res.data.data.accessToken);
        await setRefreshToken(res.data.data.refreshToken);

        console.log("access: ", getAccessToken());
        console.log("refresh: ", await getRefreshToken());
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const tempModal = () => {
    setShowModal(true);
  };

  return (
    <S.Root>
      {showModal && (
        <>
          <BlackScreen
            isModalOn={showModal}
            onClick={() => setShowModal(false)}
          />
          <Modal
            isModalOn={showModal}
            iconSrc={"images/icon_notice.svg"}
            iconAlt={"icon_notice"}
            mainContent={"기능이 곧 완성돼요!"}
            subContent={"아이디 로그인을 이용해주세요"}
            btnContent={"네, 그렇게 할게요."}
            onClickBtn={() => setShowModal(false)}
          />
        </>
      )}
      <S.TopArea>
        <S.Logo src={LogoSVG} alt="logo" />
      </S.TopArea>
      <S.BottomArea>
        <S.LoginForm onSubmit={onSubmit}>
          <Input label="아이디" value={idValue} onChangeHandler={onChangeId} />
          <Input
            label="비밀번호"
            value={pwdValue}
            type="password"
            onChangeHandler={onChangePwd}
          />
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={
              idValue.length > 0 && pwdValue.length > 0
                ? ButtonTheme.GREEN
                : ButtonTheme.GRAY
            }
            disabled={idValue.length > 0 && pwdValue.length > 0 ? false : true}
            handler={() => {
              login();
            }}
          >
            로그인
            {idValue.length > 0 && pwdValue.length > 0 ? (
              <NextArrowWhite />
            ) : (
              <NextArrowGray />
            )}
          </Button>
        </S.LoginForm>
        <S.FindLink to="/findAccount">
          아이디 또는 비밀번호를 잊으셨나요?
        </S.FindLink>
        <S.SocialAndSignup>
          <S.SocialDividerContainer>
            <S.SocialDividerLine />
            <S.SocialDividerText>소셜 로그인</S.SocialDividerText>
            <S.SocialDividerLine />
          </S.SocialDividerContainer>
          <S.SocialButtons>
            <SocialLoginCircleButton theme="kakao" onClick={tempModal} />
            <SocialLoginCircleButton theme="naver" onClick={tempModal} />
            <SocialLoginCircleButton theme="apple" onClick={tempModal} />
          </S.SocialButtons>
          <S.SignupTextsContainer>
            <S.SignupText>아직 계정이 없으신가요?</S.SignupText>
            <S.SignupLink to="/signup">회원가입하기</S.SignupLink>
          </S.SignupTextsContainer>
        </S.SocialAndSignup>
      </S.BottomArea>
    </S.Root>
  );
};

export default LoginPage;

const S = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
    background-color: var(--color-white);
  `,
  TopArea: styled.div`
    margin-top: 80px;
  `,
  Logo: styled.img`
    width: 192px;
  `,
  BottomArea: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;

    margin-bottom: 40px;
    width: calc(100% - 48px);
  `,
  LoginForm: styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  FindLink: styled(Link)`
    color: #7bab6e;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
  `,
  SocialAndSignup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    padding-bottom: 20px;
  `,
  SocialDividerContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  SocialDividerLine: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 1px;
    border-radius: 1px;
    background: #75bd62;
  `,
  SocialDividerText: styled.div`
    background-color: white;
    padding: 4px;
    white-space: nowrap;
    color: #75bd62;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  `,
  SocialButtons: styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
  `,
  SignupTextsContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 4px;
  `,
  SignupText: styled.div`
    color: var(--Dark_Green, #7bab6e);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  SignupLink: styled(Link)`
    color: var(--Dark_Green, #7bab6e);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration-line: underline;
  `,
};
