import { atom, useAtom, useAtomValue } from "jotai";
import { mainTabAtom } from "../../pages/Main";
import { useCategory } from "../../hooks/useCategory";
import { usePray } from "../../hooks/usePray";

const prayerIdAtom = atom(null);
const inputValueAtom = atom("");
const selectedCategoryIdAtom = atom(null);
const selectedDateValueAtom = atom(null);

const usePrayerModifyModal = () => {
  const [prayerId, setPrayerId] = useAtom(prayerIdAtom);
  const [textInputValue, setTextInputValue] = useAtom(inputValueAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useAtom(
    selectedCategoryIdAtom
  );
  const [selectedDateValue, setSelectedDateValue] = useAtom(
    selectedDateValueAtom
  );

  const tab = useAtomValue(mainTabAtom);

  const { categoryList } = useCategory(tab);

  const { modifyPray } = usePray(tab);

  const open = ({ prayId, content, categoryId, deadline }) => {
    setPrayerId(prayId);
    setTextInputValue(content);
    setSelectedCategoryId(categoryId);
    setSelectedDateValue(new Date(deadline));
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
      isShared: tab === "shared",
      isShow: !!prayerId,
      mode: "MODIFY",
      placeholder: "공유받은 기도제목은 내용 수정이 안 돼요",
      placeholderColor: "#6060604D",
      setSelectedDateValue,
      onChangeTextInputValue: (e) => setTextInputValue(e.target.value),
      bottomButtonText: "수정 완료",
      onClickBottomButton,
      setSelectedCategoryId,
      categoryList,
      selectedCategoryId,
      selectedDateValue,
      textInputValue: "",
      open,
      close,
    },
    open,
    close,
  };
};

export default usePrayerModifyModal;
