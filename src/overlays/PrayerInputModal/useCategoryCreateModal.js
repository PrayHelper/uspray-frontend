import { atom, useAtom, useAtomValue } from "jotai";
import { useCategory } from "../../hooks/useCategory";
import { tabStateAtom } from "../../pages/Main";

const isShowAtom = atom(false);
const textInputValueAtom = atom("");
const selectedColorAtom = atom(null);

const useCategoryCreateModal = () => {
  const [isShow, setIsShow] = useAtom(isShowAtom);
  const [textInputValue, setTextInputValue] = useAtom(textInputValueAtom);
  const [selectedColor, selectColor] = useAtom(selectedColorAtom);

  const open = () => setIsShow(true);

  const tab = useAtomValue(tabStateAtom);

  const { createCategory } = useCategory(tab);

  const resetInputs = () => {
    setTextInputValue("");
    selectColor(null);
  };

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
