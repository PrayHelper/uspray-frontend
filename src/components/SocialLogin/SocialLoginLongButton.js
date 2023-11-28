import styled from "styled-components";

// 이미지 밀림 문제 해결을 위해 border 대신 outline 이용
const styleOptions = {
  kakao: {
    bgColor: "rgba(254, 229, 0, 1)",
    color: "rgba(0, 0, 0, 1)",
    outline: "none",
  },
  naver: {
    bgColor: "rgba(3, 207, 93, 1)",
    color: "rgba(255, 255, 255, 1)",
    outline: "none",
  },
  apple: {
    bgColor: "#FFF",
    color: "#000",
    outline: "1px solid #CECECE",
  },
};

const text = {
  kakao: "카카오로 계속하기",
  naver: "네이버로 계속하기",
  apple: "Apple로 계속하기",
};

const iconSrc = {
  kakao: "images/ic_kakao.svg",
  naver: "images/ic_naver.svg",
  apple: "images/ic_apple_black.svg",
};

// theme: "kakao" | "naver" | "apple"
const SocialLoginLongButton = ({ theme, onClick }) => {
  return (
    <S.Root onClick={onClick} {...styleOptions[theme]}>
      {text[theme]}
      <S.Icon src={iconSrc[theme]} />
    </S.Root>
  );
};

const S = {
  Root: styled.button`
    height: 64px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-left: 24px;
    margin-right: 24px;
    height: 64px;
    border-radius: 32px;
    border: none;
    outline: ${({ outline }) => outline};
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
    font-weight: 700;
    position: relative;
  `,
  Icon: styled.img`
    position: absolute;
    left: 20px;
  `,
};

export default SocialLoginLongButton;
