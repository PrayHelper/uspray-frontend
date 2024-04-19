import { atom, useAtom, useAtomValue } from "jotai";
import { tabStateAtom } from "../../pages/Main";
import { useCategory } from "../../hooks/useCategory";
import { usePray } from "../../hooks/usePray";
import { useCallback } from "react";

const isOpenedAtom = atom(false);
const inputValueAtom = atom("");
const selectedCategoryIdAtom = atom(null);
const selectedDateValueAtom = atom(null);

const usePrayerCreateModal = () => {
  const [isOpened, setIsOpened] = useAtom(isOpenedAtom);
  const [textInputValue, setTextInputValue] = useAtom(inputValueAtom);
  const [selectedCategoryId, selectCategoryId] = useAtom(
    selectedCategoryIdAtom
  );
  const [selectedDateValue, selectDateValue] = useAtom(selectedDateValueAtom);

  const tab = useAtomValue(tabStateAtom);

  const { categoryList } = useCategory(tab);

  const { createPray } = usePray(tab);

  const open = () => setIsOpened(true);
  const close = useCallback(() => setIsOpened(false), [setIsOpened]);

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
      isOpened,
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
