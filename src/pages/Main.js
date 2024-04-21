import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCategory } from "../hooks/useCategory";
import { usePray } from "../hooks/usePray";
import { useLocation } from "react-router-dom";
import useFlutterWebview from "../hooks/useFlutterWebview";
import { useShare } from "../hooks/useShare";
import { useFetchSharedList } from "../hooks/useFetchSharedList";
import MainCategoryAdd from "../components/pages/Main/CategoryAdd/MainCategoryAdd";
import MainHeader from "../components/pages/Main/Header/MainHeader";
import MainCategoryAlertModal from "../components/pages/Main/CategoryAlertModal/MainCategoryAlertModal";
import MainSelectedOverlay from "../components/pages/Main/SelectedOverlay/MainSelectedOverlay";
import MainRightBottomOptions from "../components/pages/Main/overlays/MainRightBottomOptions";
import ScrollSynchronizedCategoryList, {
  ScrollSynchronizedPrayerList,
} from "../components/ScrollSynchronizedCategoryList/ScrollSynchronizedCategoryList";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { atom, useAtom, useAtomValue } from "jotai";
import usePrayerBottomModal from "../overlays/PrayerBottomModal/usePrayerBottomModal";
import usePrayerModifyModal from "../overlays/PrayerInputModal/usePrayerModifyModal";
import usePrayerCreateModal from "../overlays/PrayerInputModal/usePrayerCreateModal";
import usePrayerDeleteModal from "../overlays/PrayerDeleteModal/usePrayerDeleteModal";
import useCategoryCreateModal from "../overlays/PrayerInputModal/useCategoryCreateModal";
import PrayerBottomModal from "../overlays/PrayerBottomModal/PrayerBottomModal";
import PrayerInputModal from "../overlays/PrayerInputModal/PrayerInputModal";
import PrayerDeleteModal from "../overlays/PrayerDeleteModal/PrayerDeleteModal";
import CategoryInputModal from "../overlays/PrayerInputModal/CategoryInputModal";
import useCategoryEditModal from "../overlays/PrayerInputModal/useCategoryEditModal";

const BG_COLOR_MAP = {
  personal: "#7BAB6E",
  shared: "#3D5537",
};

export const tabStateAtom = atom("personal");
export const useTab = () => useAtom(tabStateAtom);

const MainNext = () => {
  const tab = useAtomValue(tabStateAtom);
  const { prayList } = usePray(tab);

  const { controlledProps: bottomControlledProps } = usePrayerBottomModal();
  const { controlledProps: modifyControlledProps } = usePrayerModifyModal();
  const { controlledProps: createControlledProps } = usePrayerCreateModal();
  const { controlledProps: deleteControlledProps } = usePrayerDeleteModal();
  const { controlledProps: categoryControlledProps } = useCategoryCreateModal();
  const { controlledProps: categoryEditControlledProps } =
    useCategoryEditModal();

  return (
    <>
      <MainWrapper bgColor={BG_COLOR_MAP[tab]}>
        <MainHeader />
        <ScrollSynchronizedPrayerList categoriesWithPrayers={prayList} />
        {/* <MainDotOptionsNext /> */}
      </MainWrapper>
      <PrayerBottomModal {...bottomControlledProps} />
      <PrayerInputModal {...modifyControlledProps} />
      <PrayerInputModal {...createControlledProps} />
      <PrayerDeleteModal {...deleteControlledProps} />
      <CategoryInputModal {...categoryControlledProps} />
      <CategoryInputModal {...categoryEditControlledProps} />
    </>
  );
};

const Main = () => {
  const [tab, setTab] = useState("내가 쓴"); // 내가 쓴 or 공유 받은
  const bgColor = tab === "내가 쓴" ? "#7BAB6E" : "#3D5537";
  const tabType = tab === "내가 쓴" ? "personal" : "shared";

  const [currentOverlay, setCurrentOverlay] = useState(null); // "LOCKER" | "CHANGE_ORDER" | null
  const [showCategoryAdd, setShowCategoryAdd] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);

  const [isShowPrayInput, setIsShowPrayInput] = useState(false);

  const [showRightBottomOptions, setShowRightBottomOptions] = useState(false);
  const [shareMode, setShareMode] = useState(false);

  const [selectedCategoryDataToEdit, setSelectedCategoryDataToEdit] =
    useState(null);

  const {
    categoryList,
    firstCategoryIndex,
    createCategory,
    changeCategory,
    deleteCategory,
    refetchCategoryList,
  } = useCategory(tabType);

  const prayState = usePray(tabType);
  const { refetchPrayList } = prayState;
  const { createPray } = prayState;
  const { shareLink, isMobile } = useFlutterWebview();
  const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const shareIdsData = query.getAll("share");
  const { mutate: receivePrays } = useShare();
  const { sharedDataLength, refetchSharedListData } = useFetchSharedList();
  const [isPraySelected, setIsPraySelected] = useState(false);

  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState(firstCategoryIndex);

  const [categoryRefIndex, setCategoryRefIndex] = useState(0);
  const categoryRef = useRef([]);

  const { showToast } = useToast({});

  useEffect(() => {
    if (categoryRef.current[categoryRefIndex]) {
      categoryRef.current[categoryRefIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [categoryRef, categoryRefIndex]);

  useEffect(() => {
    setShowRightBottomOptions(false);
  }, [isPraySelected]);

  const createCategoryHandler = (categoryData) => {
    try {
      createCategory(categoryData);
    } catch (error) {
      console.error(error);
    } finally {
      setShowCategoryAdd(false);
    }
  };

  const changeCategoryHandler = (data) => {
    try {
      changeCategory(data);
      setSelectedCategoryDataToEdit(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedCategoryDataToEdit(null);
    }
  };

  const deleteCategoryHandler = (categoryId) => {
    try {
      deleteCategory(categoryId);
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedCategoryDataToEdit(null);
    }
  };

  useEffect(() => {
    refetchCategoryList();
    refetchPrayList();
    refetchSharedListData();
    setShowRightBottomOptions(false);
  }, [tab]);

  useEffect(() => {
    refetchPrayList();
    setSelectedCategoryIndex(firstCategoryIndex);
  }, [categoryList]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseModal = () => {
    setShowAlertModal(false);
  };

  const onShareReceive = async (prayIds) => {
    receivePrays(
      { prayIds: prayIds },
      {
        onSuccess: () => {
          setCurrentOverlay("LOCKER");
        },
      }
    );
  };

  const onShare = async (checkedPrayIds) => {
    setShareMode(false);
    const stringPrayIds = checkedPrayIds.join(",");
    var encodePrayIds = window.btoa(stringPrayIds.toString());
    if (isMobile()) {
      if (/android/i.test(navigator.userAgent)) {
        shareLink({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/main?share=` + encodePrayIds,
        });
      } else if (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        navigator.share
      ) {
        navigator.share({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/main?share=` + encodePrayIds,
        });
      } else {
        showToast({
          message: "공유하기가 지원되지 않는 환경 입니다.",
          theme: ToastTheme.ERROR,
        });
      }
    }
    console.log(`${WEB_ORIGIN}/main?share=` + encodePrayIds);
  };

  const onClickPrayInput = () => {
    if (categoryList.length === 0) {
      setShowAlertModal(true);
    } else {
      setIsShowPrayInput(true);
    }
  };

  useEffect(() => {
    if (shareIdsData.length === 1) {
      const decodedPrayIds = window.atob(shareIdsData[0]).split(",");
      console.log(decodedPrayIds); // dev.uspray.kr 에서 테스트 후, 삭제
      onShareReceive(decodedPrayIds);
      handleTabChange("공유 받은");
    }
    if (categoryList.length > 0) {
      setSelectedCategoryIndex(firstCategoryIndex);
    }
  }, []);

  return (
    <MainWrapper bgColor={bgColor}>
      <MainCategoryAlertModal {...{ handleCloseModal, showAlertModal }} />
      <MainHeader
        {...{
          categoryList,
          onClickPrayInput,
          createPray,
          handleTabChange,
          setCurrentOverlay,
          setSelectedCategoryIndex,
          sharedDataLength,
        }}
        setIsShowInputModal={setIsShowPrayInput}
        isShowInputModal={isShowPrayInput}
        currentTab={tab}
      />
      <ScrollSynchronizedCategoryList
        {...{
          categoryList,
          setShowCategoryAdd,
          selectedCategoryIndex,
          setSelectedCategoryIndex,
          tabType,
          refetchPrayList,
          categoryRef,
          setCategoryRefIndex,
          shareMode,
          setShowRightBottomOptions,
          setShareMode,
          setIsPraySelected,
        }}
        setClickedCategoryData={setSelectedCategoryDataToEdit}
        setShowCategorySetting={setShowCategoryAdd}
        listHandler={onShare}
      />
      <MainCategoryAdd
        selectedCategoryDataToEdit={selectedCategoryDataToEdit}
        isShow={showCategoryAdd}
        createCategoryHandler={createCategoryHandler}
        onClick={handleInnerClick}
        onClose={() => setShowCategoryAdd(false)}
        tabType={tabType}
      />
      <MainCategoryAdd
        closeHandler={() => setSelectedCategoryDataToEdit(null)}
        {...{
          selectedCategoryDataToEdit,
          changeCategoryHandler,
          deleteCategoryHandler,
          tabType,
        }}
      />
      <MainSelectedOverlay
        {...{
          currentOverlay,
          refetchPrayList,
          setCurrentOverlay,
        }}
      />
      <MainRightBottomOptions
        {...{
          categoryList,
          isPraySelected,
          setCurrentOverlay,
          setShareMode,
          setShowAlertModal,
          setShowRightBottomOptions,
          shareMode,
          showRightBottomOptions,
          tab,
        }}
      />
    </MainWrapper>
  );
};

// export default Main;
export default MainNext;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;

  background-color: ${({ bgColor }) => bgColor};
`;
