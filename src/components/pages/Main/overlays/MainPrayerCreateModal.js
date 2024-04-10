import { useMainStates } from "../../../../pages/Main";
import PrayDateCategoryInput from "../../../PrayDateCategoryInput/PrayDateCategoryInput";

const MainPrayerCreateModal = () => {
  const {
    categoryList,
    prayerInput,
    setPrayerInput,
    prayerDateInput,
    setPrayerDateInput,
    activeOverlays,
    setActiveOverlays,
    setPrayerCategoryIndex,
    createPray,
  } = useMainStates();

  const createHandler = async () => {
    // createPray(
    //   {
    //     content: prayerInput,
    //     deadline: prayerDateInput,
    //     // categoryId: categoryInputValue,
    //   },
    //   {
    //     onSuccess: () => {
    //       setActiveOverlays([]);
    //       setPrayerInput("");
    //       setPrayerDateInput(null);
    //       // setSelectedCategoryIndex(categoryInputValue);
    //     },
    //   }
    // );
  };

  const closeHandler = () => setActiveOverlays([]);

  return (
    <PrayDateCategoryInput
      isShowWordCount
      showSubModal={activeOverlays.includes("PRAYER_CREATE_MODAL")}
      setShowSubModal={closeHandler}
      isDefault={false}
      maxrow={3}
      maxlen={75}
      inputPlaceHodler="기도제목을 입력해주세요"
      buttonText="기도제목 작성"
      categoryList={categoryList}
      category={0}
      setUpdateValue={setPrayerInput}
      setUpdateDate={setPrayerDateInput}
      setUpdateCategory={setPrayerCategoryIndex}
      onClickFunc={createHandler}
    />
  );
};

export default MainPrayerCreateModal;
