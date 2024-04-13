import completeImage from "../../images/check_img.svg";
import deleteImage from "../../images/delete_img.svg";
import modifyImage from "../../images/modify_img.svg";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePray } from "../../hooks/usePray";
import useToast from "../../hooks/useToast";
import useBottomNav from "../../hooks/useBottomNav";
import CategoryTag from "../CategoryTag/CategoryTag";
import MainCategory from "../pages/Main/Category/MainCategory";
import PrayDateCategoryInput from "../PrayDateCategoryInput/PrayDateCategoryInput";
import BlackScreen from "../BlackScreen";
import { Modal } from "@mui/material";
import { ToastTheme } from "../Toast/Toast";
import S from "./ScrollSynchronizedCategoryList.style";
import { Section } from "../../lib/react-scroll-section";
import TopHorizontalCategories from "./TopHorizontalCategories/TopHorizontalCategories";
import CategoryBoxes from "./CategoryBoxes/CategoryBoxes";
import { useCallback } from "react";
import { debounce } from "../../lib/react-scroll-section/utils";
import { useMemo } from "react";
import { createRef } from "react";

import smoothscroll from "smoothscroll-polyfill";
import TopCategoryList from "./TopCategoryList/TopCategoryList";
import BottomCategoryBoxList from "./BottomBoxList/BottomBoxList";

if (typeof window !== "undefined") {
  smoothscroll.polyfill();
}

const VerticalCategories = ({
  prayList,
  setSelectedPrayInfo,
  setClickedCategoryData,
  tabType,
  categoryRef,
  shareMode,
  setCheckedList,
  checkedList,
}) => {
  return prayList.map((category, index) => (
    <Section key={category.categoryId} id={category.categoryId}>
      <MainCategory
        key={index}
        categoryId={category.categoryId}
        title={category.categoryName}
        prays={category.prays}
        color={category.categoryColor}
        setSelectedPrayInfo={setSelectedPrayInfo}
        setClickedCategoryData={setClickedCategoryData}
        tabType={tabType}
        categoryRef={categoryRef}
        refIndex={index}
        shareMode={shareMode}
        setCheckedList={setCheckedList}
        checkedList={checkedList}
      />
    </Section>
  ));
};

export const MainNextContext = createContext({
  topMap: {},
  registerTopRef: () => {},
  unregisterTopRef: () => {},

  bottomMap: {},
  registerBottomRef: () => {},
  unregisterBottomRef: () => {},

  handleTopItemClick: () => {},
  selectedId: null,
});

export const ScrollingContext = createContext({
  registerTopItemRef: (id, node) => {},
  registerBottomItemRef: (id, node) => {},
  onClickTopItem: (id) => {},
  registerTopListRef: (node) => {},
  registerBottomListRef: (node) => {},
  selectedId: null,
});

const ScrollingProvider = ({ children }) => {
  const topItemsRef = useRef({});
  const bottomItemsRef = useRef({});
  const topListRef = useRef(null);
  const bottomListRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const syncTopScroll = useCallback((id) => {
    const item = topItemsRef.current[id];

    const offset = -16;

    if (item && topListRef.current) {
      topListRef.current.scrollTo({
        left: item.offsetLeft + offset,
        behavior: "smooth",
      });
    }
  }, []);

  const syncBottomScroll = useCallback((id) => {
    const item = bottomItemsRef.current[id];

    const offset = -98;

    if (item && bottomListRef) {
      bottomListRef.current.scrollTo({
        top: item.offsetTop + offset,
        behavior: "smooth",
      });
    }
  }, []);

  const onClickTopItem = useCallback(
    (id) => {
      console.log({ id });
      syncTopScroll(id);
      syncBottomScroll(id);
      setSelectedId(id);
    },
    [syncTopScroll, syncBottomScroll]
  );

  const handleBottomScroll = useCallback(
    (event) => {
      // 상단 리스트에서 발생한 scroll은 무시
      if (event && event.target.contains(topListRef.current)) return;

      if (!bottomItemsRef?.current) return;
      if (!bottomListRef?.current) return;

      const { id } = Object.keys(bottomItemsRef.current).reduce(
        (acc, id) => {
          const nowSection = bottomItemsRef.current[id];
          if (!nowSection) {
            return { id, diffrenceFromTop: 0 };
          }

          const checkRef = nowSection.getBoundingClientRect();
          const listRect = bottomListRef.current.getBoundingClientRect();

          const diffrenceFromTop = Math.abs(checkRef.top - listRect.top);

          if (diffrenceFromTop >= acc.diffrenceFromTop) return acc;

          return {
            id,
            diffrenceFromTop,
          };
        },
        {
          id: "",
          diffrenceFromTop: 9999,
        }
      );

      console.log("id to scroll: ", id);

      if (selectedId !== id) {
        syncTopScroll(id);
        setSelectedId(id);
      }
    },
    [selectedId, syncTopScroll]
  );

  const debounceScroll = debounce(handleBottomScroll, 50);

  useEffect(() => {
    document.addEventListener("scroll", debounceScroll, true);

    handleBottomScroll();

    return () => document.removeEventListener("scroll", debounceScroll, true);
  }, []);

  const registerTopItemRef = useCallback((id, node) => {
    topItemsRef.current[id] = node;
  }, []);

  const registerBottomItemRef = useCallback((id, node) => {
    bottomItemsRef.current[id] = node;
  }, []);

  const registerTopListRef = useCallback((node) => {
    topListRef.current = node;
  }, []);

  const registerBottomListRef = useCallback((node) => {
    bottomListRef.current = node;
  }, []);

  return (
    <ScrollingContext.Provider
      value={{
        registerTopItemRef,
        registerBottomItemRef,
        registerTopListRef,
        registerBottomListRef,
        onClickTopItem,
        selectedId,
      }}>
      {children}
    </ScrollingContext.Provider>
  );
};

export const NextNext = ({
  categoriesWithPrayers,
  openCategoryAddModal,
  openCategoryModifyModal, // category 객체를 받아 편집 Modal open
  openPrayerBottomModal, // prayer 객체를 받아 완료-수정-삭제 Modal open
  togglePrayerHeart, // prayer id를 받아 heart on/off
  isShareMode,
  setShareModeOn,
  togglePrayerShareItem, // prayer id를 받아 checkbox on/off
}) => {
  return (
    <ScrollingProvider>
      <S.MainContentWrapper>
        <TopCategoryList categories={categoriesWithPrayers} />
        <BottomCategoryBoxList categories={categoriesWithPrayers} />
      </S.MainContentWrapper>
    </ScrollingProvider>
  );
};

export const MainContentNext = () => {
  // 1. 상단 카테고리 클릭시 수평방향 스크롤 + 하단에서 수직방향 스크롤
  // 2. 하단 스크롤시 상단 카테고리 변경 + 수평방향 스크롤

  const entireRef = useRef(null);
  const topListRef = useRef(null);
  const bottomListRef = useRef(null);

  const [topMap, setTopMap] = useState({});
  const [bottomMap, setBottomMap] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const syncTopScroll = useCallback(
    (id) => {
      const topSection = topMap[id];

      if (topSection?.ref.current && topListRef?.current) {
        topListRef.current.scrollTo({
          left: topSection.ref.current.offsetLeft - 16,
          behavior: "smooth",
        });
      }
    },
    [topMap]
  );

  const syncBottomScroll = (id) => {
    const bottomSection = bottomMap[id];

    if (bottomSection?.ref.current && entireRef?.current) {
      entireRef.current.scrollTo({
        top: bottomSection.ref.current.offsetTop - 98,
        behavior: "smooth",
      });
    }
  };

  const handleBottomScroll = useCallback(
    (event) => {
      if (
        topListRef?.current &&
        !!event &&
        topListRef?.current.contains(event.target)
      )
        return;

      console.log(1);

      const selectedSection = Object.keys(bottomMap).reduce(
        (acc, id) => {
          const sectionRef = bottomMap[id].ref.current;
          if (!sectionRef) {
            return {
              id,
              differenceFromTop: 0,
            };
          }

          const { top } = sectionRef.getBoundingClientRect();
          const differenceFromTop = Math.abs(
            top - entireRef.current.getBoundingClientRect().top - 40
          );

          if (differenceFromTop >= acc.differenceFromTop) return acc;

          return {
            id,
            differenceFromTop,
          };
        },
        {
          id: "",
          differenceFromTop: 9999,
        }
      );

      if (selectedId !== selectedSection.id) {
        syncTopScroll(selectedSection.id);
        setSelectedId(String(selectedSection.id));
      }
    },
    [bottomMap, selectedId, syncTopScroll]
  );

  const DEBOUNCE_DELAY = 50; // TODO: 다른곳으로 빼기

  const debounceScroll = debounce(handleBottomScroll, DEBOUNCE_DELAY);

  useEffect(() => {
    document.addEventListener("scroll", debounceScroll, true);

    handleBottomScroll();

    return () => document.removeEventListener("scroll", debounceScroll, true);
  }, [debounceScroll, handleBottomScroll]);

  const registerTopRef = useMemo(
    () =>
      ({ id }) => {
        const ref = createRef();
        setTopMap((prev) => ({ ...prev, [id]: { ref } }));

        return ref;
      },
    []
  );

  const unregisterTopRef = useMemo(
    () => (id) => {
      setTopMap(({ [id]: toRemove, ...rest }) => rest);
    },
    []
  );

  const registerBottomRef = useMemo(
    () =>
      ({ id }) => {
        const ref = createRef();
        setBottomMap((prev) => ({ ...prev, [id]: { ref } }));

        return ref;
      },
    []
  );

  const unregisterBottomRef = useMemo(
    () => (id) => {
      setBottomMap(({ [id]: toRemove, ...rest }) => rest);
    },
    []
  );

  const handleTopItemClick = (id) => {
    syncTopScroll(String(id));
    syncBottomScroll(String(id));

    setTimeout(() => {
      setSelectedId(String(id));
    }, 1000);
  };

  return (
    <MainNextContext.Provider
      value={{
        bottomMap,
        registerBottomRef,
        unregisterBottomRef,
        topMap,
        registerTopRef,
        unregisterTopRef,
        selectedId,
        handleTopItemClick,
      }}>
      <S.MainContentWrapper ref={entireRef}>
        <TopHorizontalCategories ref={topListRef} />
        <CategoryBoxes ref={bottomListRef} />
      </S.MainContentWrapper>
    </MainNextContext.Provider>
  );
};

const ScrollSynchronizedCategoryList = ({
  categoryList,
  setShowCategorySetting,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  tabType,
  setClickedCategoryData,
  categoryRef,
  setCategoryRefIndex,
  shareMode,
  setShareMode,
  listHandler,
  setIsPraySelected,
}) => {
  const [selectedPrayInfo, setSelectedPrayInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  // 기도제목 수정할 때 아래 기도 정보 사용
  const [modifyPrayInfo, setModifyPrayInfo] = useState(null);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const { prayList, deletePray, completePray, modifyPray } = usePray(tabType);
  const { showToast } = useToast({});
  const { setIsVisible } = useBottomNav();
  const contentRef = useRef(null);

  const prayModify = () => {
    setModifyPrayInfo(selectedPrayInfo);
    setSelectedPrayInfo(null);
  };

  useEffect(() => {
    if (modifyPrayInfo) {
      setPrayInputValue(modifyPrayInfo.content);
      setDateInputValue(modifyPrayInfo.deadline);
      setCategoryInputValue(modifyPrayInfo.categoryId);
      setShowSubModal(true);
    }
  }, [modifyPrayInfo]);

  useEffect(() => {
    if (showSubModal || showModal) {
      setIsPraySelected(true);
      setIsVisible(false);
    } else {
      setIsPraySelected(false);
      setIsVisible(true);
    }
  }, [showSubModal, showModal, setIsPraySelected, setIsVisible]);

  useEffect(() => {
    if (showModal) {
      setIsPraySelected(true);
      setIsVisible(false);
    } else {
      setIsPraySelected(false);
      setIsVisible(true);
    }
  }, [showModal]);

  useEffect(() => {
    if (!shareMode) setCheckedList([]);
  }, [shareMode]);

  // 기도를 수정하는 함수
  const onModify = async (text, deadline, categoryId) => {
    modifyPray(
      {
        prayId: modifyPrayInfo.prayId,
        content: text,
        deadline: deadline,
        categoryId: categoryId,
      },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setPrayInputValue("");
          setDateInputValue(null);
          setSelectedCategoryIndex(categoryId);
        },
      }
    );
  };

  const onCancel = () => {
    setShareMode(false);
    setShowModal(false);
    setSelectedPrayInfo(null);
  };

  const onDelete = () => {
    setShowModal(true);
  };

  const clickShareButton = () => {
    if (checkedList.length !== 0) {
      listHandler(checkedList);
    }
  };

  const clickBlackBackground = () => {
    if (!shareMode) {
      setSelectedPrayInfo(null);
    }
  };

  return (
    <>
      <S.MainContentWrapper shareMode={shareMode}>
        <BlackScreen
          isModalOn={showModal}
          onClick={() => setShowModal(false)}
        />
        {showModal && (
          <Modal
            isModalOn={showModal}
            iconSrc={"images/ic_group_pray_delete.svg"}
            iconAlt={"group_pray_delete"}
            mainContent={"정말 삭제하시겠습니까?"}
            subContent={"선택한 기도제목이 삭제됩니다."}
            btnContent={"삭제"}
            btnContent2={"취소"}
            onClickBtn={() => {
              deletePray(selectedPrayInfo.prayId, {
                onSuccess: () => {
                  setShowModal(false);
                  setSelectedPrayInfo(null);
                },
              });
            }}
            onClickBtn2={onCancel}
            modalTheme={2}
          />
        )}
        {showSubModal && (
          <PrayDateCategoryInput
            categoryList={categoryList}
            showSubModal={showSubModal}
            setShowSubModal={setShowSubModal}
            inputPlaceHodler={modifyPrayInfo.content}
            maxrow={3}
            maxlen={75}
            isShowWordCount={true}
            isDefault={modifyPrayInfo.isShared}
            setUpdateValue={setPrayInputValue}
            setUpdateDate={setDateInputValue}
            setUpdateCategory={setCategoryInputValue}
            buttonText="기도제목 수정"
            value={prayInputValue}
            date={modifyPrayInfo.deadline}
            category={modifyPrayInfo.categoryId}
            onClickFunc={() =>
              onModify(prayInputValue, dateInputValue, categoryInputValue)
            }
          />
        )}
        {prayList && (
          <>
            <S.TopWrapper shareMode={shareMode}>
              <CategoryTag
                categoryList={categoryList}
                selectedCategoryIndex={selectedCategoryIndex}
                setSelectedCategoryIndex={setSelectedCategoryIndex}
                setShowCategorySetting={setShowCategorySetting}
                canAdd={!shareMode}
                setCategoryRefIndex={setCategoryRefIndex}
              />
            </S.TopWrapper>
            <S.Content ref={contentRef}>
              <VerticalCategories
                {...{
                  categoryRef,
                  checkedList,
                  setCheckedList,
                  shareMode,
                  setSelectedPrayInfo,
                  setClickedCategoryData,
                  tabType,
                  prayList,
                }}
              />
            </S.Content>
          </>
        )}
      </S.MainContentWrapper>
      <S.BottomSetWrapper
        selectedPrayInfo={selectedPrayInfo}
        showModal={showModal}>
        <S.BottomButtonWrapper>
          <img src={completeImage} alt="" />
          <S.BottomButtonText
            color={"green"}
            onClick={() => {
              completePray(selectedPrayInfo.prayId);
              showToast({
                message: "기도제목을 완료했어요.",
                theme: ToastTheme.SUCCESS,
              });
              setSelectedPrayInfo(null);
            }}>
            완료하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={modifyImage} alt="" />
          <S.BottomButtonText
            color={"blue"}
            onClick={() => prayModify(selectedPrayInfo)}>
            수정하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={deleteImage} alt="" />
          <S.BottomButtonText color={"red"} onClick={() => onDelete()}>
            삭제하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
      </S.BottomSetWrapper>
      <S.BottomShareWrapper shareMode={shareMode}>
        <S.ShareNumberText>{checkedList.length + "개 선택"}</S.ShareNumberText>
        <S.ShareButtonContainer>
          <S.ShareButtonWrapper
            disabled={true}
            color={"white"}
            onClick={onCancel}>
            취소하기
            <S.ShareButtonImage src="images/ic_share_cancel.svg" />
          </S.ShareButtonWrapper>
          <S.ShareButtonWrapper
            disabled={checkedList.length === 0}
            color={"green"}
            onClick={clickShareButton}>
            공유하기
            <S.ShareButtonImage src="images/ic_share_move.svg" />
          </S.ShareButtonWrapper>
        </S.ShareButtonContainer>
      </S.BottomShareWrapper>
      <S.BlackBackground
        selectedPrayInfo={selectedPrayInfo}
        shareMode={shareMode}
        onClick={clickBlackBackground}
        showModal={showModal}
      />
    </>
  );
};

export default ScrollSynchronizedCategoryList;
