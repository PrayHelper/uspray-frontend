import { atom, useAtom } from "jotai";
import useToast from "../../hooks/useToast";
import { ToastTheme } from "../../components/Toast/Toast";
import useMobileShareMode from "../../hooks/useMobileShareMode";
import useCheckMobile from "../../hooks/useCheckMobile";

const isOpenedAtom = atom(false);
const isSelectedMapAtom = atom({});

const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

const useShareSelectionModal = () => {
  const [isOpened, setIsOpened] = useAtom(isOpenedAtom);
  const [isSelectedMap, setIsSelectedMap] = useAtom(isSelectedMapAtom);

  const { shareLink } = useMobileShareMode();
  const { isMobile } = useCheckMobile();

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
        message: "공유하기가 지원되지 않는 환경 입니다.",
        theme: ToastTheme.ERROR,
      });
    }

    close();
    console.log({ encodedIdListString });
  };

  return {
    isOpened,
    shareControlledProps: {
      isOpened,
      onClickCancelButton: close,
      onClickActionButton: share,
      mode: "SHARE",
      selectedLength,
    },
    toggleById,
    isSelectedMap,
    open,
    close,
  };
};

export default useShareSelectionModal;
