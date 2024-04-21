import styled from "styled-components";

const MainDotOptions = ({
  isOpened,
  isTabSharedMode,
  open,
  close,
  onClickOrder,
  onClickShare,
}) => {
  return (
    <>
      <S.OptionItem
        src="images/ic_main_option.svg"
        alt="main_option_icon"
        onClick={open}
        isVisible={!isOpened}
        movingDistance={0}
      />
      <S.OptionItem
        src="images/ic_main_option_close.svg"
        alt="main_option_close_icon"
        onClick={close}
        isVisible={isOpened}
        movingDistance={0}
      />
      <S.OptionItem
        src="images/ic_main_order.svg"
        alt="main_order_icon"
        onClick={onClickOrder}
        isVisible={isOpened}
        movingDistance={72}
      />
      <S.OptionItem
        src="images/ic_main_share.svg"
        alt="main_share_icon"
        onClick={onClickShare}
        isVisible={isOpened && !isTabSharedMode}
        movingDistance={144}
      />
    </>
  );
};

export default MainDotOptions;

const S = {
  OptionItem: styled.img`
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
    position: fixed;
    bottom: ${(props) =>
      props.isVisible ? `calc(80px + ${props.movingDistance}px)` : "80px"};
    right: 20px;
    transition: all 0.2s ease;
    filter: ${(props) =>
      props.isVisible ? "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))" : "none"};
  `,
};
