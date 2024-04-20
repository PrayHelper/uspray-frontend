import { atom, useAtom, useAtomValue } from "jotai";
import { usePray } from "../../hooks/usePray";
import { tabStateAtom } from "../../pages/Main";

const selectedPrayerInto = atom(null);

const usePrayerDeleteModal = () => {
  const [selectedPrayerInfo, selectPrayerInfo] = useAtom(selectedPrayerInto);

  const open = (prayerInfo) => selectPrayerInfo(prayerInfo);

  const close = () => selectPrayerInfo(null);

  const tab = useAtomValue(tabStateAtom);

  const { deletePray } = usePray(tab);

  const controlledProps = {
    isShow: !!selectedPrayerInfo,
    deleteHandler: () =>
      deletePray(selectedPrayerInfo.prayId, {
        onSuccess: close,
      }),
    cancelHandler: close,
  };

  return { open, close, controlledProps };
};

export default usePrayerDeleteModal;
