import { useState } from "react";
import PrayDateCategoryInput from "../../../PrayDateCategoryInput/PrayDateCategoryInput";
import S from "./MainHeader.style";

const HeaderBottomAreaContent = ({
  currentTab,
  isShowInputModal,
  onClickPrayInput,
  categoryList,
  setIsShowInputModal,
  createPray,
  setSelectedCategoryIndex,
  setCurrentOverlay,
}) => {
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);

  const onClickFuncOnPrayDateCategoryInput = async () => {
    createPray(
      {
        content: prayInputValue,
        deadline: dateInputValue,
        categoryId: categoryInputValue,
      },
      {
        onSuccess: () => {
          setIsShowInputModal(false);
          setPrayInputValue("");
          setDateInputValue(null);
          setSelectedCategoryIndex(categoryInputValue);
        },
      }
    );
  };

  if (currentTab === "공유 받은")
    return (
      <S.MoveToLockerButton onClick={() => setCurrentOverlay("LOCKER")}>
        보관함에 X개의 기도제목이 있어요
      </S.MoveToLockerButton>
    );
  else if (currentTab === "내가 쓴") {
    if (isShowInputModal)
      return (
        <PrayDateCategoryInput
          isShowWordCount
          showSubModal
          setShowSubModal={setIsShowInputModal}
          isDefault={false}
          maxrow={3}
          maxlen={75}
          inputPlaceHodler="기도제목을 입력해주세요"
          buttonText="기도제목 작성"
          categoryList={categoryList}
          category={0}
          setIsShowInputModal
          setUpdateValue={setPrayInputValue}
          setUpdateDate={setDateInputValue}
          setUpdateCategory={setCategoryInputValue}
          onClickFunc={onClickFuncOnPrayDateCategoryInput}
        />
      );
    else
      return (
        <S.Input
          type="text"
          placeholder="기도제목을 입력해주세요"
          readOnly
          onClick={onClickPrayInput}
        />
      );
  }

  // 도달 안해야 정상
  return null;
};

const MainHeader = ({
  handleTabChange,
  currentTab, // "내가 쓴" or "공유 받은"
  isShowInputModal,
  onClickPrayInput,
  setIsShowInputModal,
  categoryList,
  createPray,
  setSelectedCategoryIndex,
  setCurrentOverlay,
}) => {
  return (
    <S.HeaderRootContainer>
      <S.TabList>
        {["내가 쓴", "공유 받은"].map((tab) => (
          <S.TabItem
            key={tab}
            active={currentTab === tab}
            onClick={() => handleTabChange(tab)}>
            {tab}
          </S.TabItem>
        ))}
      </S.TabList>
      <S.BottomAreaWrapper>
        <HeaderBottomAreaContent
          {...{
            categoryList,
            createPray,
            currentTab,
            isShowInputModal,
            onClickPrayInput,
            setIsShowInputModal,
            setSelectedCategoryIndex,
            setCurrentOverlay,
          }}
        />
      </S.BottomAreaWrapper>
    </S.HeaderRootContainer>
  );
};

export default MainHeader;
