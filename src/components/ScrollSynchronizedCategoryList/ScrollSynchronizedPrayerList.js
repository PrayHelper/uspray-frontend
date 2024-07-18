import { createContext, useEffect, useRef, useState } from "react";
import S from "./ScrollSynchronizedCategoryList.style";
import { useCallback } from "react";
import TopCategoryList from "./TopCategoryList/TopCategoryList";
import BottomCategoryBoxList from "./BottomBoxList/BottomBoxList";
import { useSelectionModal } from "../../overlays/SelectionModal/useSelectionModal";
import SelectionModal from "../../overlays/SelectionModal/SelectionModal";

export const PrayerListDataContext = createContext({
  isSharedPrayers: false,
  isSelectable: false,
  categoriesWithPrayers: [],
});

export const PrayerListScrollingContext = createContext({
  registerTopItemRef: (id, node) => {},
  registerBottomItemRef: (id, node) => {},
  onClickTopItem: (id) => {},
  registerTopListRef: (node) => {},
  registerBottomListRef: (node) => {},
  selectedId: null,
});

const PrayerListScrollingProvider = ({ children }) => {
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
      syncBottomScroll(id);
    },
    [syncBottomScroll]
  );

  const handleBottomScroll = useCallback(
    (event) => {
      // 상단 리스트에서 발생한 scroll은 무시
      if (event && event.target.contains(topListRef.current)) {
        //console.log(1);
        return;
      }

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
  }, [handleBottomScroll, debounceScroll]);

  const registerTopItemRef = useCallback((id, node) => {
    if (!node) delete topItemsRef.current[id];
    else topItemsRef.current[id] = node;
  }, []);

  const registerBottomItemRef = useCallback((id, node) => {
    if (!node) delete bottomItemsRef.current[id];
    else bottomItemsRef.current[id] = node;
  }, []);

  const registerTopListRef = useCallback((node) => {
    if (!node) delete topListRef.current;
    else topListRef.current = node;
  }, []);

  const registerBottomListRef = useCallback((node) => {
    if (!node) delete bottomListRef.current;
    else bottomListRef.current = node;
  }, []);

  return (
    <PrayerListScrollingContext.Provider
      value={{
        registerTopItemRef,
        registerBottomItemRef,
        registerTopListRef,
        registerBottomListRef,
        onClickTopItem,
        selectedId,
      }}
    >
      {children}
    </PrayerListScrollingContext.Provider>
  );
};

const debounce = (func, waitFor) => {
  let timeout = null;

  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

export const ScrollSynchronizedPrayerList = ({
  categoriesWithPrayers,
  isSharedPrayers,
}) => {
  const { isOpened: isSelectable, controlledModalProps } = useSelectionModal();

  // 더 세련된 방법으로 z-index를 제어하는 방법을 찾았다면 고쳐주세요ㅜㅜ
  const zIndex = isSelectable ? 131 : "auto";

  return (
    <PrayerListDataContext.Provider
      value={{ categoriesWithPrayers, isSharedPrayers, isSelectable }}
    >
      <PrayerListScrollingProvider>
        <S.WrapperNew zIndex={zIndex}>
          <TopCategoryList />
          <BottomCategoryBoxList />
        </S.WrapperNew>
        <SelectionModal {...controlledModalProps} />
      </PrayerListScrollingProvider>
    </PrayerListDataContext.Provider>
  );
};

export default ScrollSynchronizedPrayerList;
