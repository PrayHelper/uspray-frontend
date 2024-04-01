import ChangeCategoryOrder from "../../../../pages/ChangeCategoryOrder";
import Locker from "../Locker/Locker";
import Overlay from "../../../Overlay/Overlay";

const MainSelectedOverlay = ({
  refetchPrayList,
  setCurrentOverlay,
  currentOverlay, // "LOCKER" | "CHANGE_ORDER" | null
}) => {
  switch (currentOverlay) {
    case "LOCKER":
      return (
        <Overlay isOverlayOn>
          <Locker
            goBack={() => setCurrentOverlay(null)}
            refetchPrayList={refetchPrayList}
          />
        </Overlay>
      );
    case "CHANGE_ORDER":
      return (
        <Overlay isOverlayOn>
          <ChangeCategoryOrder setIsOverlayOn={() => setCurrentOverlay(null)} />
        </Overlay>
      );
    default:
      return null;
  }
};

export default MainSelectedOverlay;
