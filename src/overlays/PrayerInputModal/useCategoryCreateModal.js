import { atom, useAtom, useAtomValue } from "jotai";
import { useCategory } from "../../hooks/useCategory";
import { mainTabAtom } from "../../pages/Main";
import { CATEGORY_COLORS } from "./CategoryInputModal";
import { useCallback, useEffect } from "react";

const isShowAtom = atom(false);
const textInputValueAtom = atom("");
const selectedColorAtom = atom(null);

const useCategoryCreateModal = () => {
  const [isShow, setIsShow] = useAtom(isShowAtom);
  const [textInputValue, setTextInputValue] = useAtom(textInputValueAtom);
  const [selectedColor, selectColor] = useAtom(selectedColorAtom);

  const open = () => setIsShow(true);

  const tab = useAtomValue(mainTabAtom);

  const { createCategory } = useCategory(tab);

  const resetInputs = useCallback(() => {
    setTextInputValue("");
    selectColor(CATEGORY_COLORS[0]);
  }, [selectColor, setTextInputValue]);

  useEffect(() => {
    resetInputs();
  }, [resetInputs]);

  const close = () => {
    resetInputs();
    setIsShow(false);
  };

  const onClickBottomButton = () => {
    createCategory({
      name: textInputValue,
      color: selectedColor,
      type: tab,
    });
    close();
  };

  return {
    open,
    close,
    controlledProps: {
      isShow,
      textInputValue,
      mode: "CREATE",
      onChangeTextInputValue: (e) => setTextInputValue(e.target.value),
      onClickBottomButton,
      selectedColor,
      selectColor,
      closeHandler: close,
    },
  };
};

export default useCategoryCreateModal;
