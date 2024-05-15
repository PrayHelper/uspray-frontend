import { useAtom } from "jotai";
import { mainModeAtom } from "../../../../pages/Main";
import useToast from "../../../../hooks/useToast";
import Overlay from "../../../Overlay/Overlay";
import styled from "styled-components";
import LockerHeaderNew from "./LockerHeader";
import LockerPrayerList from "./LockerPrayerList";
import { useFetchSharedList } from "../../../../hooks/useFetchSharedList";
import { useDeleteSharedList } from "../../../../hooks/useDeleteSharedList";
import { useState } from "react";
import { getDDayLabel } from "../../../../utils/date";
import { ToastTheme } from "../../../Toast/Toast";
import usePrayerSaveModal from "../../../../overlays/PrayerInputModal/usePrayerSaveModal";
import PrayerSaveModal from "../../../../overlays/PrayerInputModal/PrayerSaveModal";

const NoDataExists = () => (
  <S.NoDataWrapper>
    <S.NoDataTitle>공유받은 기도제목이 없네요.</S.NoDataTitle>
    <S.NoDataContent>공유받으면 보관함에 저장됩니다!</S.NoDataContent>
  </S.NoDataWrapper>
);

const useCheckStateFromSharedList = (sharedList) => {
  const [isCheckedMap, setIsCheckedMap] = useState({});

  // 한개 이상 체크되었는지
  const isCheckedAtLeastOne = Object.values(isCheckedMap).some(Boolean);

  const toggleById = (id) => {
    setIsCheckedMap(({ [id]: prev, ...rest }) => ({
      [id]: !prev,
      ...rest,
    }));
  };

  const clearAllItems = () => setIsCheckedMap({});

  const activateAllItems = () =>
    setIsCheckedMap(
      sharedList.reduce((acc, cur) => {
        acc[cur.sharedPrayId] = true;

        return acc;
      }, {})
    );

  // 전체 선택 / 전체 취소
  const toggleAllItem = () => {
    if (isCheckedAtLeastOne) clearAllItems();
    else activateAllItems();
  };

  const getSelectedSharedPrayIds = () =>
    Object.keys(isCheckedMap)
      .filter((sharedPrayId) => !!isCheckedMap[sharedPrayId])
      .map(Number);

  return {
    isCheckedMap,
    isCheckedAtLeastOne,
    clearAllItems,
    activateAllItems,
    toggleAllItem,
    toggleById,
    getSelectedSharedPrayIds,
  };
};

const useLockerStates = () => {
  const { sharedListData, refetchSharedListData } = useFetchSharedList();
  const { mutateAsync: deleteListData } = useDeleteSharedList();
  const {
    isCheckedMap,
    isCheckedAtLeastOne,
    toggleById,
    toggleAllItem,
    getSelectedSharedPrayIds,
    clearAllItems,
  } = useCheckStateFromSharedList(sharedListData);

  const { showToast } = useToast({});

  // LockerItem 컴포넌트의 props 참고
  const lockerPrayerList = sharedListData.map(
    ({ name, content, sharedPrayId, createdAt }) => ({
      name,
      content,
      isChecked: isCheckedMap[sharedPrayId],
      dDayLabel: getDDayLabel(createdAt),
      onClick: () => toggleById(sharedPrayId),
    })
  );

  const deleteHandler = () => {
    const selectedSharedPrayIds = getSelectedSharedPrayIds();

    deleteListData(
      { sharedPrayIds: selectedSharedPrayIds },
      {
        onSuccess: () => {
          showToast({
            message: "기도제목이 삭제되었습니다.",
            theme: ToastTheme.SUCCESS,
          });
          refetchSharedListData();
          clearAllItems();
        },
      }
    );
  };

  const { open } = usePrayerSaveModal();

  return {
    lockerPrayerList,
    isCheckedAtLeastOne,
    deleteHandler,
    saveHandler: () => {
      open(getSelectedSharedPrayIds());
    },
    toggleAllItem,
  };
};

const MainLocker = () => {
  const [mainMode, setMainMode] = useAtom(mainModeAtom);

  const {
    lockerPrayerList,
    isCheckedAtLeastOne,
    deleteHandler,
    saveHandler,
    toggleAllItem,
  } = useLockerStates();

  const { controlledProps } = usePrayerSaveModal();

  const isDataEmpty = lockerPrayerList.length === 0;

  return (
    <Overlay isOverlayOn={mainMode === "LOCKER"}>
      <S.PageWrapper>
        <LockerHeaderNew
          {...{
            isDataEmpty,
            isCheckedAtLeastOne,
            toggleAllItem,
            deleteHandler,
            saveHandler,
          }}
        />
        <S.ContentOuter>
          <S.ContentInner>
            {isDataEmpty ? (
              <NoDataExists />
            ) : (
              <LockerPrayerList lockerPrayerList={lockerPrayerList} />
            )}
          </S.ContentInner>
        </S.ContentOuter>
        <S.BottomButton onClick={() => setMainMode("DEFAULT")}>
          뒤로 가기
        </S.BottomButton>
      </S.PageWrapper>
      <PrayerSaveModal {...controlledProps} />
    </Overlay>
  );
};

export default MainLocker;

const S = {
  PageWrapper: styled.div`
    background-color: var(--color-light-green);

    height: 100vh;
    width: 100%;

    z-index: 100;
  `,
  ContentOuter: styled.div`
    padding: 65px 0;
  `,
  ContentInner: styled.div`
    height: calc(100vh - 130px);
    overflow: auto;
  `,
  NoDataWrapper: styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  NoDataTitle: styled.div`
    font-weight: 700;
    font-size: 28px;
    line-height: 41px;
    color: var(--color-dark-green);
  `,
  NoDataContent: styled.div`
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    color: var(--color-secondary-green);
  `,
  BottomButton: styled.div`
    position: absolute;
    left: 0;
    bottom: 0;

    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
    cursor: pointer;
    width: 100%;
    font-weight: 500;
    text-align: center;
    padding: 20px 0px;
    background-color: var(--color-dark-green);
    color: var(--color-white);
  `,
};
