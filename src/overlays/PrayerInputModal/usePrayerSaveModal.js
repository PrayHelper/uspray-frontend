import { atom, useAtom } from "jotai";
import { useCategory } from "../../hooks/useCategory";
import { useCallback } from "react";
import { getCalculatedDate } from "../../utils/date";
import { useEffect } from "react";
import { useUpdateSharedList } from "../../hooks/useUpdateSharedList";
import { ToastTheme } from "../../components/Toast/Toast";
import useToast from "../../hooks/useToast";
import { usePray } from "../../hooks/usePray";
import { useFetchSharedList } from "../../hooks/useFetchSharedList";

const selectedSharedIdsAtom = atom(null);
const selectedCategoryIdAtom = atom(null);
const selectedDateValueAtom = atom(null);
const tab = "shared";

const usePrayerSaveModal = () => {
  const [selectedSharedIds, selectSharedIds] = useAtom(selectedSharedIdsAtom);
  const [selectedCategoryId, selectCategoryId] = useAtom(
    selectedCategoryIdAtom
  );
  const [selectedDateValue, selectDateValue] = useAtom(selectedDateValueAtom);

  const { categoryList, firstCategoryIndex: firstCategoryId } =
    useCategory(tab);

  const { refetchSharedListData } = useFetchSharedList();

  const { refetchPrayList } = usePray(tab);

  const { mutate: updateListData } = useUpdateSharedList();

  const { showToast } = useToast({});

  const resetValues = useCallback(() => {
    selectCategoryId(firstCategoryId);
    selectDateValue(getCalculatedDate(7)); // 7일 후로 설정
  }, [selectCategoryId, selectDateValue, firstCategoryId]);

  const open = (sharedIds) => selectSharedIds(sharedIds);

  const close = useCallback(() => {
    resetValues();
    selectSharedIds(null);
  }, [resetValues, selectSharedIds]);

  useEffect(() => {
    resetValues();
  }, [resetValues]);

  const onClickBottomButton = useCallback(() => {
    updateListData(
      {
        sharedPrayIds: selectedSharedIds,
        deadline: selectedDateValue,
        categoryId: selectedCategoryId,
      },
      {
        onSuccess: () => {
          refetchSharedListData();
          refetchPrayList();
          showToast({
            message: "기도제목이 저장되었습니다.",
            theme: ToastTheme.SUCCESS,
          });
        },
      }
    );
    close();
  }, [
    close,
    updateListData,
    selectedSharedIds,
    selectedDateValue,
    selectedCategoryId,
    refetchSharedListData,
    refetchPrayList,
    showToast,
  ]);

  return {
    controlledProps: {
      isShow: !!selectedSharedIds,
      selectedListLength: selectedSharedIds?.length,
      onClickBackground: close,
      onClickBottomButton,
      selectedDateValue,
      selectDateValue,
      categoryList,
      selectedCategoryId,
      selectCategoryId,
    },
    open,
    close,
  };
};

export default usePrayerSaveModal;
