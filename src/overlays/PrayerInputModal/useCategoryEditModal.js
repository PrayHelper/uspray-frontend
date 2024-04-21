import { atom, useAtom, useAtomValue } from "jotai";
import { mainTabAtom } from "../../pages/Main";
import { useCategory } from "../../hooks/useCategory";

const categoryIdAtom = atom(null);
const categoryNameAtom = atom("");
const selectedColorAtom = atom(null);

const useCategoryEditModal = () => {
  const [categoryId, setCategoryId] = useAtom(categoryIdAtom);
  const [textInputValue, setTextInput] = useAtom(categoryNameAtom);
  const [selectedColor, selectColor] = useAtom(selectedColorAtom);

  const tab = useAtomValue(mainTabAtom);

  const { changeCategory, deleteCategory } = useCategory(tab);

  const open = ({ id, name, color }) => {
    setCategoryId(id);
    setTextInput(name);
    selectColor(color);
  };

  const close = () => setCategoryId(null);

  const onClickBottomButton = () => {
    changeCategory({
      id: categoryId,
      name: textInputValue,
      color: selectedColor,
      type: tab,
    });
    close();
  };

  const onClickSecondaryButton = () => {
    deleteCategory(categoryId);
    close();
  };

  return {
    controlledProps: {
      isShow: !!categoryId,
      mode: "MODIFY",
      selectedColor,
      textInputValue,
      selectColor,
      onChangeTextInputValue: (e) => setTextInput(e.target.value),
      closeHandler: close,
      onClickBottomButton,
      onClickSecondaryButton,
    },
    open,
    close,
  };
};

export default useCategoryEditModal;
