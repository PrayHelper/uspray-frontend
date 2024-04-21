import { atom, useAtom, useAtomValue } from "jotai";
import { tabStateAtom } from "../../pages/Main";
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
  const [selectedCategoryId, selectCategoryId] = useAtom(
    selectedCategoryIdAtom
  );
  const [selectedDateValue, selectDateValue] = useAtom(selectedDateValueAtom);

  const tab = useAtomValue(tabStateAtom);

  const { categoryList, firstCategoryIndex } = useCategory(tab);

  const { createPray } = usePray(tab);

  const open = () => setIsShow(true);

  const resetValues = useCallback(() => {
    setTextInputValue("");
    selectCategoryId(firstCategoryIndex);
    selectDateValue(getCalculatedDate(7));
  }, [
    selectCategoryId,
    selectDateValue,
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
      selectCategoryId,
      selectedDateValue,
      selectDateValue,
      onClickBottomButton,
      onClickBackground: close,
      categoryList,
    },
    open,
    close,
  };
};

export default usePrayerCreateModal;
