import { OverlayWrapper } from "./style";
import { useState, useEffect } from 'react';

const Overlay = ({ isOverlayOn, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isOverlayOn) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 300);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOverlayOn]);

  if (!isOpen)
    return null;

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
