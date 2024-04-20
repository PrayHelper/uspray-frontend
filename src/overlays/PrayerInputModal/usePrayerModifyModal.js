import { atom, useAtom, useAtomValue } from "jotai";
import { tabStateAtom } from "../../pages/Main";
import { useCategory } from "../../hooks/useCategory";
import { usePray } from "../../hooks/usePray";

const prayerIdAtom = atom(null);
const inputValueAtom = atom("");
const selectedCategoryIdAtom = atom(null);
const selectedDateValueAtom = atom(null);

const usePrayerModifyModal = () => {
  const [prayerId, setPrayerId] = useAtom(prayerIdAtom);
  const [textInputValue, setTextInputValue] = useAtom(inputValueAtom);
  const [selectedCategoryId, selectCategoryId] = useAtom(
    selectedCategoryIdAtom
  );
  const [selectedDateValue, selectDateValue] = useAtom(selectedDateValueAtom);

  const tab = useAtomValue(tabStateAtom);

  const { categoryList } = useCategory(tab);

  const { modifyPray } = usePray(tab);

  const open = ({ prayId, content, categoryId, deadline }) => {
    setPrayerId(prayId);
    setTextInputValue(content);
    selectCategoryId(categoryId);
    selectDateValue(deadline);
  };

  const close = () => setPrayerId(null);

  const onClickBottomButton = () => {
    const data = {
      prayId: prayerId,
      content: textInputValue,
      deadline: selectedDateValue,
      categoryId: selectedCategoryId,
    };
    modifyPray(data);
    close();
    // 기도제목이 수정되었습니다 toast 띄우기
  };

  return {
    controlledProps: {
      isShow: !!prayerId,
      isShared: false,
      mode: "CREATE",
      selectDateValue,
      onChangeTextInputValue: (e) => setTextInputValue(e.target.value),
      bottomButtonText: "기도제목 수정",
      onClickBackground: close,
      onClickBottomButton,
      selectCategoryId,
      categoryList,
      selectedCategoryId,
      selectedDateValue,
      textInputValue,
    },
    open,
    close,
  };
};

export default usePrayerModifyModal;
