import { useAtom } from "jotai";
import { mainModeAtom } from "../../../../pages/Main";
import useToast from "../../../../hooks/useToast";
import Overlay from "../../../Overlay/Overlay";
import styled from "styled-components";
import { LockerHeaderNew } from "../../../Locker/LockerHeader";
import LockerPrayerList from "./LockerPrayerList";
import { useFetchSharedList } from "../../../../hooks/useFetchSharedList";
import { useDeleteSharedList } from "../../../../hooks/useDeleteSharedList";
import { useState } from "react";
import { useUpdateSharedList } from "../../../../hooks/useUpdateSharedList";
import { getDDayLabel } from "../../../../utils/date";
import { ToastTheme } from "../../../Toast/Toast";

const fixedTabName = "shared";

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

  const toggleSingleItem = (id) => {
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
    toggleSingleItem,
    getSelectedSharedPrayIds,
  };
};

const useLockerStates = () => {
  const { sharedListData, refetchSharedListData } = useFetchSharedList();
  const { mutateAsync: deleteListData } = useDeleteSharedList();
  const { mutate: updateListData } = useUpdateSharedList();
  const {
    isCheckedMap,
    isCheckedAtLeastOne,
    toggleSingleItem,
    toggleAllItem,
    getSelectedSharedPrayIds,
    activateAllItems,
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
      onClick: () => toggleSingleItem(sharedPrayId),
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

  const saveHandler = () => {};

  return {
    lockerPrayerList,
    isCheckedAtLeastOne,
    deleteHandler,
    saveHandler,
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

  const isDataEmpty = lockerPrayerList.length === 0;

  return (
    <Overlay isOverlayOn={mainMode === "LOCKER"}>
      <S.Wrapper>
        <LockerHeaderNew
          {...{
            isDataEmpty,
            isCheckedAtLeastOne,
            toggleAllItem,
            saveHandler,
            deleteHandler,
          }}
        />
        {isDataEmpty ? (
          <NoDataExists />
        ) : (
          <LockerPrayerList lockerPrayerList={lockerPrayerList} />
        )}
        <S.BottomButton onClick={() => setMainMode("DEFAULT")}>
          뒤로 가기
        </S.BottomButton>
      </S.Wrapper>
    </Overlay>
  );
};

export default MainLocker;

const S = {
  Wrapper: styled.div`
    background-color: var(--color-light-green);

    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100%;

    z-index: 100;
  `,
  NoDataWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
