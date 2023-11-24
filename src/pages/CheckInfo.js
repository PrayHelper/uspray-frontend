import UserHeader from "../components/UserHeader";
import Input from "../components/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastTheme } from "../components/Toast/Toast";
import { useCheckPassword } from "../hooks/useCheckPassword";
import useToast from "../hooks/useToast";
import { ReactComponent as NextArrow_gray } from "../images/ic_next_arrow_gray.svg";
import { ReactComponent as NextArrow_white } from "../images/ic_next_arrow_white.svg";


const CheckInfo = () => {
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const pwRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const pwCheck = (pw) => {
    return pwRegEx.test(pw);
  };

  const { mutate } = useCheckPassword({
    password: password,
  });

  const { showToast } = useToast({});

  const checkPassword = () => {
    mutate(null, {
      onSuccess: (res) => {
        console.log(res);
        if (res.data.message === true) navigate("/changeInfo");
        else if (res.data.message === false) {
          showToast({
            message: "비밀번호가 일치하지 않습니다.",
            theme: ToastTheme.ERROR,
          });
          setDisabled(true);
        }
      },
      onError: (e) => {},
    });
  };

  // 배포 이후에 스크롤 생기면 아래 코드 적용
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);

  //     return (() => {
  //       window.removeEventListener('resize');
  //     });
  //   })
  // }, []);

  // 사용 방법
  // height: "calc(var(--var, 1vh) * 100)"

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <UserHeader>회원정보 확인</UserHeader>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "24px",
        }}>
        <div style={{ padding: "0 16px" }}>
          <div
            style={{
              lineHeight: "35px",
              color: "#75BD62",
              fontWeight: "700",
              fontSize: "24px",
              marginBottom: "40px",
            }}>
            안전을 위해 <br />
            회원정보를 확인할게요!
          </div>
          <Input
            label="비밀번호"
            type="password"
            onChangeHandler={passwordChangeHandler}
            value={password}
            onFocusHandler={() => {
              setDisabled(false);
            }}
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
              buttonSize={ButtonSize.LARGE}
              buttonTheme={
                pwCheck(password) && !disabled
                  ? ButtonTheme.GREEN
                  : ButtonTheme.GRAY
              }
              disabled={!pwCheck(password) || disabled}
              handler={() => {
                checkPassword();
              }}>
              회원정보 확인
              {(pwCheck(password) && !disabled) ? <NextArrow_white/> 
              : 
              <NextArrow_gray/>} 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInfo;
