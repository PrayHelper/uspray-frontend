import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import styled from "styled-components";
import { mainModeAtom, mainTabAtom } from "../../../../pages/Main";
import useShareSelectionModal from "../../../../overlays/SelectionModal/useShareSelectionModal";

const MainDotOptions = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [mainMode, setMainMode] = useAtom(mainModeAtom);

  const { open: openShareSelectionModal } = useShareSelectionModal();

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  const onClickOrder = () => {
    setMainMode("CHANGE_CATEGORY_ORDER");
    close();
  };

  const onClickShare = () => {
    openShareSelectionModal();
    close();
  };

  const isTabSharedMode = useAtomValue(mainTabAtom) === "shared";

  if (mainMode !== "DEFAULT") return null;

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
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
    position: fixed;
    bottom: ${({ isVisible, movingDistance }) =>
      isVisible ? `calc(80px + ${movingDistance}px)` : "80px"};
    right: 20px;
    transition: all 0.2s ease;
    filter: ${({ isVisible }) =>
      isVisible ? "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))" : "none"};
    z-index: 120;
  `,
};
