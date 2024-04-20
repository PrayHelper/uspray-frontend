import { atom, useAtom, useAtomValue } from "jotai";
import { tabStateAtom } from "../../pages/Main";
import { usePray } from "../../hooks/usePray";
import useToast from "../../hooks/useToast";
import { useCallback } from "react";
import { ToastTheme } from "../../components/Toast/Toast";
import usePrayerModifyModal from "../PrayerInputModal/usePrayerModifyModal";
import usePrayerDeleteModal from "../PrayerDeleteModal/usePrayerDeleteModal";

const selectedPrayerInfoAtom = atom(null);

const usePrayerBottomModal = () => {
  const [selectedPrayerInfo, selectPrayerInfo] = useAtom(
    selectedPrayerInfoAtom
  );
  const { open: openModifyModal } = usePrayerModifyModal();

  const { open: openDeleteModal } = usePrayerDeleteModal();

  const tab = useAtomValue(tabStateAtom);

  const { completePray } = usePray(tab);

  const { showToast } = useToast({});

  const onClickComplete = useCallback(() => {
    completePray(selectedPrayerInfo.prayId);
    showToast({
      message: "기도제목을 완료했어요.",
      theme: ToastTheme.SUCCESS,
    });
    selectPrayerInfo(null);
  }, [completePray, selectedPrayerInfo, selectPrayerInfo, showToast]);

  const onClickModify = useCallback(() => {
    openModifyModal(selectedPrayerInfo);
  }, [openModifyModal, selectedPrayerInfo]);

  const onClickDelete = useCallback(() => {
    openDeleteModal(selectedPrayerInfo);
  }, [openDeleteModal, selectedPrayerInfo]);

  const close = () => selectPrayerInfo(null);

  return {
    selectedPrayerInfo,
    selectPrayerInfo,
    open: selectPrayerInfo,
    close,
    controlledProps: {
      onClickComplete,
      onClickModify,
      onClickDelete,
      closeModal: close,
      isShow: !!selectedPrayerInfo,
    },
  };
};

export default usePrayerBottomModal;
