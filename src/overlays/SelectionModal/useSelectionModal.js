import { atom, useAtom } from "jotai";
import useToast from "../../hooks/useToast";
import { ToastTheme } from "../../components/Toast/Toast";
import useMobileShareMode from "../../hooks/useMobileShareMode";
import useCheckMobile from "../../hooks/useCheckMobile";
import { useGroupPray } from "../../hooks/useGroupPray";

export const selectionModeAtom = atom("SHARE"); // "SHARE" | "BRING"
export const groupIdAtom = atom(0);

const isOpenedAtom = atom(false);
const isSelectedMapAtom = atom({});

const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

export const useSelectionModal = () => {
  const [isOpened, setIsOpened] = useAtom(isOpenedAtom);
  const [isSelectedMap, setIsSelectedMap] = useAtom(isSelectedMapAtom);
  const [mode] = useAtom(selectionModeAtom);
  const [groupId] = useAtom(groupIdAtom);

  const { shareLink } = useMobileShareMode();
  const { isMobile, userAgent } = useCheckMobile();
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

  const share = () => {
    if (selectedLength === 0) return;

    const checkedIdListString = Object.keys(isSelectedMap)
      .filter((id) => isSelectedMap[id])
      .join(",");
    const encodedIdListString = window.btoa(checkedIdListString);

    if (isMobile()) {
      shareLink({
        title: "제 기도제목을 함께 기도해주세요!",
        url: `${WEB_ORIGIN}/main?share=` + encodedIdListString,
      });
    } else {
      showToast({
        message: `공유하기가 지원되지 않는 환경 입니다. (${userAgent})`,
        theme: ToastTheme.ERROR,
      });
    }

    close();
    console.log({ encodedIdListString });
  };

  const bring = () => {
    if (selectedLength === 0) return;

    const selectedPrayIds = Object.keys(isSelectedMap)
      .filter((id) => isSelectedMap[id])
      .map((id) => id.replace("id", ""))
      .map(Number);

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

  const onClickActionButton = mode === "SHARE" ? share : bring;

  return {
    isOpened,
    controlledModalProps: {
      isOpened,
      onClickCancelButton: close,
      onClickActionButton,
      selectedLength,
      mode,
    },
    toggleById,
    isSelectedMap,
    open,
    close,
  };
};
