import { atom, useAtom } from "jotai";
import useToast from "../../hooks/useToast";
import { ToastTheme } from "../../components/Toast/Toast";
import { useGroupPray } from "../../hooks/useGroupPray";
import { useAtomValue } from "jotai";
import { groupIdAtom } from "../../pages/Group";

const isOpenedAtom = atom(false);
const isSelectedMapAtom = atom({});

const useBringSelectionModal = () => {
  const [isOpened, setIsOpened] = useAtom(isOpenedAtom);
  const [isSelectedMap, setIsSelectedMap] = useAtom(isSelectedMapAtom);

  const groupId = useAtomValue(groupIdAtom);
  const { bringPrayToGroup } = useGroupPray(groupId);

  const selectedLength = Object.values(isSelectedMap).filter(Boolean).length;

  const open = () => setIsOpened(true);

  const close = () => {
    setIsSelectedMap({});
    setIsOpened(false);
  };

  const toggleById = (id) => {
    setIsSelectedMap(({ [id]: prev, ...rest }) => ({
      [id]: !prev,
      ...rest,
    }));
  };

  const { showToast } = useToast({});

  const bring = () => {
    if (selectedLength === 0) return;

    const selectedPrayIds = Object.keys(isSelectedMap)
      .filter((id) => isSelectedMap[id]) // true인 항목만 필터링
      .map((id) => id.replace("id", "")) // 'id' 접두사 제거
      .map(Number); // 문자열을 숫자로 변환

    bringPrayToGroup(
      {
        groupId: groupId,
        prayId: selectedPrayIds,
      },
      {
        onSuccess: () => {
          showToast({
            message: "기도제목이 모임원들에게 공유되었어요.",
            theme: ToastTheme.SUCCESS,
          });
          setIsOpened(false);
        },
      }
    );

    close();
  };

  return {
    isOpened,
    bringControlledProps: {
      isOpened,
      onClickCancelButton: close,
      onClickActionButton: bring,
      mode: "BRING",
      selectedLength,
    },
    toggleById,
    isSelectedMap,
    open,
    close,
  };
};

export default useBringSelectionModal;
