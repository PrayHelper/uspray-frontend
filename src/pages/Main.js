import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCategory } from "../hooks/useCategory";
import { usePray } from "../hooks/usePray";
import { useLocation } from "react-router-dom";
import useFlutterWebview from "../hooks/useFlutterWebview";
import { useShare } from "../hooks/useShare";
import { useFetchSharedList } from "../hooks/useFetchSharedList";
import MainCategoryAdd from "../components/pages/Main/CategoryAdd/MainCategoryAdd";
import MainHeader, {
  MainHeaderNext,
} from "../components/pages/Main/Header/MainHeader";
import MainCategoryAlertModal from "../components/pages/Main/CategoryAlertModal/MainCategoryAlertModal";
import MainCategoryModifyModal from "../components/pages/Main/overlays/MainCategoryModifyModal";
import MainSelectedOverlay from "../components/pages/Main/SelectedOverlay/MainSelectedOverlay";
import MainRightBottomOptions from "../components/pages/Main/overlays/MainRightBottomOptions";
import ScrollSynchronizedCategoryList, {
  MainContentNext,
} from "../components/ScrollSynchronizedCategoryList/ScrollSynchronizedCategoryList";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { atom, useAtom } from "jotai";
import Overlay from "../components/Overlay/Overlay";
import Locker from "../components/pages/Main/Locker/Locker";
import ChangeCategoryOrder from "./ChangeCategoryOrder";
import MainPrayerBottomModal from "../components/pages/Main/overlays/MainPrayerBottomModal";
import { useScrollSections } from "../lib/react-scroll-section";
import MainPrayerCreateModal from "../components/pages/Main/overlays/MainPrayerCreateModal";
import MainPrayerModifyModal from "../components/pages/Main/overlays/MainPrayerModifyModal";
import MainCategoryCreateModal from "../components/pages/Main/overlays/MainCategoryCreateModal";

// 관리 필요 state

// 선택된 tab

// overlay
// - 기도제목 수정 / 생성에 필요한 기도제목 Input Modal(or Category 0개시 모달) - 기도제목 입력 text, 선택된 category
// - 기도제목 완료 / 수정 / 삭제 Modal on / off
// - 카테고리 생성 / 수정 / 삭제에 필요한 Input + Palatte Modal
// - 순서 변경 / 보관함 on / off

const BG_COLOR_MAP = {
  personal: "#7BAB6E",
  shared: "#3D5537",
};

const tabStateAtom = atom("personal");
const selectedPrayerToEdit = atom(null);
const prayerInputAtom = atom("");
const prayerDateInputAtom = atom(null);
const prayerCategoryIndexAtom = atom(null);
const categoryInputAtom = atom("");
const showPrayerInputModalAtom = atom(false);
const showPrayerHandleBottomModalAtom = atom(false);
const showBottomDotOptionsAtom = atom(false);
const selectedCategoryToEditAtom = atom(null);
const selectedPrayAtom = atom(null);
// "LOCKER" | "CHANGE_CATEGORY_ORDER" |
// "PRAYER_BOTTOM_MODAL" | "PRAYER_MODIFY_MODAL" | "PRAYER_CREATE_MODAL" |
// "CATEGORY_CREATE_MODAL" | "CATEGORY_MODIFY_MODAL" |
// "RIGHT_BOTTOM_OPTIONS"
const activeOverlaysAtom = atom([]);
const isShareModeAtom = atom(false);
const checkIdListAtom = atom([]);

export const useMainStates = () => {
  const [tab, setTab] = useAtom(tabStateAtom);
  const [isShareMode, setIsShareMode] = useAtom(isShareModeAtom);
  const [selectedPray, setSelectedPrayToEdit] = useAtom(selectedPrayerToEdit);
  const [prayerInput, setPrayerInput] = useAtom(prayerInputAtom);
  const [prayerDateInput, setPrayerDateInput] = useAtom(prayerDateInputAtom);
  const [categoryInput, setCategoryInput] = useAtom(categoryInputAtom);
  const [showPrayerInputModal, setShowPrayerInputModal] = useAtom(
    showPrayerInputModalAtom
  );
  const [prayerCategoryIndex, setPrayerCategoryIndex] = useAtom(
    prayerCategoryIndexAtom
  );
  const [showPrayerHandleBottomModal, setShowPrayerHandleBottomModal] = useAtom(
    showPrayerHandleBottomModalAtom
  );
  const [showBottomDotOptions, setShowBottomDotOptions] = useAtom(
    showBottomDotOptionsAtom
  );
  const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useAtom(
    selectedCategoryToEditAtom
  );
  const [selectedScrollPray, setSelectedScrollPray] = useAtom(selectedPrayAtom);
  const [activeOverlays, setActiveOverlays] = useAtom(activeOverlaysAtom);
  const {
    categoryList,
    firstCategoryIndex,
    changeCategory,
    createCategory,
    deleteCategory,
    refetchCategoryList,
  } = useCategory(tab);
  const { refetchSharedListData, sharedDataLength, sharedListData } =
    useFetchSharedList();
  const {
    prayList,
    modifyPray,
    cancelPray,
    createPray,
    deletePray,
    completePray,
    todayPray,
  } = usePray(tab);
  const [checkedIdList, setCheckedIdList] = useAtom(checkIdListAtom);
  const sections = useScrollSections();

  return {
    tab,
    prayerInput,
    categoryInput,
    showPrayerInputModal,
    showPrayerHandleBottomModal,
    showBottomDotOptions,
    selectedCategoryToEdit,
    selectedScrollPray,
    activeOverlays,
    prayerDateInput,
    prayerCategoryIndex,
    selectedPray,

    setTab,
    setPrayerInput,
    setCategoryInput,
    setShowPrayerInputModal,
    setShowPrayerHandleBottomModal,
    setShowBottomDotOptions,
    setSelectedCategoryToEdit,
    setSelectedScrollPray,
    setActiveOverlays,
    setPrayerDateInput,
    setPrayerCategoryIndex,
    setSelectedPrayToEdit,

    categoryList,
    firstCategoryIndex,

    changeCategory,
    createCategory,
    deleteCategory,
    refetchCategoryList,

    refetchSharedListData,
    sharedDataLength,
    sharedListData,

    prayList,
    modifyPray,
    createPray,
    deletePray,
    completePray,
    cancelPray,
    todayPray,

    isShareMode,
    setIsShareMode,

    checkedIdList,
    setCheckedIdList,

    sections,
  };
};

// 페이지에 띄울 Overlay
const MainOverlays = () => {
  const { activeOverlays, setActiveOverlays, refetchPrayList } =
    useMainStates();

  const clearOverlays = () => setActiveOverlays([]);

  return (
    <>
      <Overlay isOverlayOn={activeOverlays.includes("LOCKER")}>
        <Locker goBack={clearOverlays} refetchPrayList={refetchPrayList} />
      </Overlay>
      <Overlay isOverlayOn={activeOverlays.includes("CHANGE_CATEGORY_ORDER")}>
        <ChangeCategoryOrder setIsOverlayOn={clearOverlays} />
      </Overlay>
      <MainPrayerCreateModal />
      <MainPrayerModifyModal />

      {activeOverlays.includes("CATEGORY_CREATE_MODAL") && (
        <MainCategoryCreateModal />
      )}
      {activeOverlays.includes("CATEGORY_MODIFY_MODAL") && (
        <MainCategoryModifyModal />
      )}
      {activeOverlays.includes("RIGHT_BOTTOM_OPTIONS") && (
        <MainRightBottomOptions />
      )}
      {activeOverlays.includes("PRAYER_BOTTOM_MODAL") && (
        <MainPrayerBottomModal />
      )}
    </>
  );
};

const MainNext = () => {
  const { shareLink, isMobile } = useFlutterWebview();

  const { tab } = useMainStates();

  return (
    <>
      <MainOverlays />
      <MainWrapper bgColor={BG_COLOR_MAP[tab]}>
        <MainHeaderNext />
        <MainContentNext />
      </MainWrapper>
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
