import { atom, useAtom, useAtomValue } from "jotai";
import { mainTabAtom } from "../../pages/Main";
import { useCategory } from "../../hooks/useCategory";
import { usePray } from "../../hooks/usePray";
import { useCallback, useEffect } from "react";
import { getCalculatedDate } from "../../utils/date";

const isOpenedAtom = atom(false);
const inputValueAtom = atom("");
const selectedCategoryIdAtom = atom(null);
const selectedDateValueAtom = atom(null);

const usePrayerCreateModal = () => {
  const [isShow, setIsShow] = useAtom(isOpenedAtom);
  const [textInputValue, setTextInputValue] = useAtom(inputValueAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useAtom(
    selectedCategoryIdAtom
  );
  const [selectedDateValue, setSelectedDateValue] = useAtom(
    selectedDateValueAtom
  );

  const tab = useAtomValue(mainTabAtom);

  const { categoryList, firstCategoryIndex } = useCategory(tab);

  const { createPray } = usePray(tab);

  const open = () => setIsShow(true);

  const resetValues = useCallback(() => {
    setTextInputValue("");
    setSelectedCategoryId(firstCategoryIndex);
    setSelectedDateValue(getCalculatedDate(7));
  }, [
    setSelectedCategoryId,
    setSelectedDateValue,
    setTextInputValue,
    firstCategoryIndex,
  ]);

  useEffect(() => {
    resetValues();
  }, [resetValues]);

  const close = useCallback(() => {
    resetValues();
    setIsShow(false);
  }, [setIsShow, resetValues]);

  const onClickBottomButton = useCallback(() => {
    const data = {
      content: textInputValue,
      deadline: selectedDateValue,
      categoryId: selectedCategoryId,
    };
    createPray(data);
    close();
  }, [
    createPray,
    textInputValue,
    selectedDateValue,
    selectedCategoryId,
    close,
  ]);

  return {
    controlledProps: {
      isShow,
      open,
      close,
      textInputValue,
      setTextInputValue,
      selectedCategoryId,
      onChangeTextInputValue: (e) => setTextInputValue(e.target.value),
      bottomButtonText: "기도제목 작성",
      placeholder: "기도제목을 입력해주세요",
      setSelectedCategoryId,
      selectedDateValue,
      setSelectedDateValue,
      onClickBottomButton,
      categoryList,
    },
    open,
    close,
  };
};

export default usePrayerCreateModal;
