import ChangeCategoryOrder from "../../../../pages/ChangeCategoryOrder";
import Locker from "../../../../pages/Locker";
import Overlay from "../../../Overlay/Overlay";

const LockerOverlay = ({ setIsLockerOverlayOn, refetchPrayList }) => (
  <Overlay isOverlayOn>
    <Locker
      setIsOverlayOn={setIsLockerOverlayOn}
      refetchPrayList={refetchPrayList}
    />
  </Overlay>
);

const ChangeCategoryOrderOverlay = ({ setIsOrderOverlayOn }) => (
  <Overlay isOverlayOn>
    <ChangeCategoryOrder setIsOverlayOn={setIsOrderOverlayOn} />
  </Overlay>
);

const MainSelectedOverlay = ({
  refetchPrayList,
  setCurrentOverlay,
  currentOverlay, // "LOCKER" | "CHANGE_ORDER" | null
}) => {
  switch (currentOverlay) {
    case "LOCKER":
      return (
        <LockerOverlay
          setIsOrderOverlayOn={() => setCurrentOverlay("LOCKER")}
          refetchPrayList={refetchPrayList}
        />
      );
    case "CHANGE_ORDER":
      return (
        <ChangeCategoryOrderOverlay
          setIsOrderOverlayOn={() => setCurrentOverlay("CHANGE_ORDER")}
        />
      );
    default:
      return null;
  }
};

export default MainSelectedOverlay;
