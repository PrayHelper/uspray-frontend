import { useMainStates } from "../../../../pages/Main";
import PrayDateCategoryInput from "../../../PrayDateCategoryInput/PrayDateCategoryInput";

const MainPrayerModifyModal = () => {
  const {
    categoryList,
    modifyPray,
    prayerInput,
    setPrayerInput,
    prayerDateInput,
    setPrayerDateInput,
    setActiveOverlays,
    setPrayerCategoryIndex,
    selectedPray,
    activeOverlays,
  } = useMainStates();

  const modifyHandler = async () => {
    // modifyPray(
    //   {
    //     prayId: selectedPray.prayId,
    //     content: prayerInput,
    //     deadline: prayerDateInput,
    //   },
    //   {
    //     onSuccess: () => {
    //       setActiveOverlays([]);
    //       setPrayerInput("");
    //       setPrayerDateInput(null);
    //     },
    //   }
    // );
  };

  const closeHandler = () => setActiveOverlays([]);

  if (!selectedPray) return null;

  return (
    <PrayDateCategoryInput
      isShowWordCount
      categoryList={categoryList}
      showSubModal={activeOverlays.includes("PRAYER_MODIFY_MODAL")}
      setShowSubModal={closeHandler}
      maxrow={3}
      maxlen={75}
      isDefault={selectedPray.isShared}
      setUpdateValue={setPrayerInput}
      setUpdateDate={setPrayerDateInput}
      setUpdateCategory={setPrayerCategoryIndex}
      buttonText="기도제목 수정"
      value={prayerInput}
      date={selectedPray.deadline}
      category={selectedPray.categoryId}
      onClickFunc={modifyHandler}
    />
  );
};

export default MainPrayerModifyModal;
