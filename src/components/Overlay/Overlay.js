import { OverlayWrapper } from "./style";

const Modal = ({ isOverlayOn, children }) => {
  return (
    <OverlayWrapper
      isOverlayOn={isOverlayOn}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </OverlayWrapper>
  );
};

export default Modal;
