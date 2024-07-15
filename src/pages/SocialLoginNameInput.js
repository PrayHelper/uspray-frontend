import React from "react";
import SignupTos from "../components/SignupTos/SignupTos";
import useSignupTos from "../hooks/useSignupTos";
import UserHeader from "../components/UserHeader";
import { ToastTheme } from "../components/Toast/Toast";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input/Input";
import publicapi from "../api/publicapi";
import { useState } from "react";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import useAuthorized from "../hooks/useAuthorized";
import useAuthToken from "../hooks/useAuthToken";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import { ReactComponent as NextArrowGray } from "../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrowWhite } from "../images/ic_next_arrow_white.svg";
import useSendDeviceToken from "../hooks/useSendDeviceToken";
import useMobileToken from "../hooks/useMobileToken";

const SocialLoginNameInput = () => {
  const { isAgreed, toggleAll, toggleHandler, isAgreedAll } = useSignupTos();
  const { setAccessToken, setRefreshToken } = useAuthToken();
  const { getDeviceToken } = useMobileToken();
  const { showToast } = useToast({});
  const { mutate: sendDeviceToken } = useSendDeviceToken();
  const { setAutorized } = useAuthorized();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const socialLoginNameInputReq = async () => {
    const api = `/member/oauth`;
    try {
      const res = await publicapi.put(
        api,
        { name, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        try {
          const deviceToken = await getDeviceToken();
          sendDeviceToken({
            fcmToken: deviceToken,
          });
        } catch (e) {
          console.log(e);
        }

        navigate("/main");
        setAutorized();

        setAccessToken(res.data.data.accessToken);
        await setRefreshToken(res.data.data.refreshToken);
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

  const isNameFieldEmpty = name !== "";
  const isSignupButtonActivated = isAgreedAll && isNameFieldEmpty;

  return (
    <S.Root>
      <UserHeader>회원가입</UserHeader>
      <S.BelowHeader>
        <S.TopArea>
          <S.DescriptionsAndInput>
            <S.Descriptions>
              <S.Description1>이름은 실명으로 설정해주세요!</S.Description1>
              <S.Description2>
                기도제목 공유 시 이름으로 전달됩니다.
              </S.Description2>
            </S.Descriptions>
            <Input
              label="이름*"
              onChangeHandler={onChangeName}
              value={name}
              isError={false}
              description=""
            />
          </S.DescriptionsAndInput>
          <SignupTos {...{ isAgreed, toggleHandler, toggleAll, isAgreedAll }} />
        </S.TopArea>
        <Button
          disabled={!isSignupButtonActivated}
          buttonSize={ButtonSize.LARGE}
          buttonTheme={
            isSignupButtonActivated ? ButtonTheme.GREEN : ButtonTheme.GRAY
          }
          handler={() => {
            socialLoginNameInputReq();
          }}
        >
          회원가입
          {isSignupButtonActivated ? <NextArrowWhite /> : <NextArrowGray />}
        </Button>
      </S.BelowHeader>
    </S.Root>
  );
};

export default SocialLoginNameInput;

const S = {
  Root: styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  BelowHeader: styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 24px 24px 40px 24px;
  `,
  TopArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  DescriptionsAndInput: styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
  `,
  Descriptions: styled.div``,
  Description1: styled.div`
    color: #75bd62;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.96px;
  `,
  Description2: styled.div`
    color: var(--Grey, #a0a0a0);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
  `,
};
