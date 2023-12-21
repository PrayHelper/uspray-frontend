import styled from "styled-components";

const styleOptions = {
  kakao: {
    bgColor: "rgba(254, 229, 0, 1)",
    color: "rgba(0, 0, 0, 1)",
  },
  naver: {
    bgColor: "rgba(3, 207, 93, 1)",
    color: "rgba(255, 255, 255, 1)",
  },
  apple: {
    bgColor: "rgba(0, 0, 0, 1)",
    color: "rgba(255, 255, 255, 1)",
  },
};

const iconSrc = {
  kakao: "images/ic_kakao.svg",
  naver: "images/ic_naver.svg",
  apple: "images/ic_apple_white.svg",
};

// theme: "kakao" | "naver" | "apple"
const SocialLoginCircleButton = ({ theme, onClick }) => {
  return (
    <S.Root onClick={onClick} {...styleOptions[theme]}>
      <S.Icon
        width={theme === "kakao" ? "36px" : "24px"}
        src={iconSrc[theme]}
      />
    </S.Root>
  );
};

export default SocialLoginCircleButton;

const S = {
  Root: styled.button`
    height: 64px;
    width: 64px;
    border-radius: 50%;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
  `,
  Icon: styled.img`
    width: ${({ width }) => width};
  `,
};
