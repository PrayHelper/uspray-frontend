import { OverlayWrapper } from "./style";

const Overlay = ({ isOverlayOn, children }) => {
  return (
    <OverlayWrapper
      isOverlayOn={isOverlayOn}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </OverlayWrapper>
  );
};

export default Overlay;
