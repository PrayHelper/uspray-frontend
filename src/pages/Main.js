import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { usePray } from "../hooks/usePray";
import { useSearchParams } from "react-router-dom";
import { useShare } from "../hooks/useShare";
import MainHeader from "../components/pages/Main/Header/MainHeader";
import { ScrollSynchronizedPrayerList } from "../components/ScrollSynchronizedCategoryList/ScrollSynchronizedPrayerList";
import { atom, useAtomValue, useSetAtom } from "jotai";
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
import MainDotOptions from "../components/pages/Main/DotOptions/MainDotOptions";
import MainChangeCategoryOrder from "../components/pages/Main/ChangeCategoryOrder/MainChangeCategoryOrder";
import MainLocker from "../components/pages/Main/Locker/MainLocker";

const BG_COLOR_MAP = {
  personal: "#7BAB6E",
  shared: "#3D5537",
};

export const mainModeAtom = atom("DEFAULT"); // "DEFAULT" | "CHANGE_CATEGORY_ORDER" | "LOCKER"

export const mainTabAtom = atom("personal"); // "personal" | "shared"

const useReceive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMountedRef = useRef(false);

  const setTab = useSetAtom(mainTabAtom);
  const setMainMode = useSetAtom(mainModeAtom);

  const { mutate: receivePrays } = useShare();

  useEffect(() => {
    if (isMountedRef.current) return;

    const sharedIds = searchParams.get("share");

    if (sharedIds) {
      const decodedPrayIds = window.atob(sharedIds).split(",");

      receivePrays({ prayIds: decodedPrayIds });

      setTab("shared");
      setMainMode("LOCKER");
      setSearchParams({ share: "" });
    }

    isMountedRef.current = true;
  }, [receivePrays, searchParams, setTab, setSearchParams, setMainMode]);
};

const Main = () => {
  const tab = useAtomValue(mainTabAtom);
  const { prayList } = usePray(tab);

  const { controlledProps: bottomControlledProps } = usePrayerBottomModal();
  const { controlledProps: modifyControlledProps } = usePrayerModifyModal();
  const { controlledProps: createControlledProps } = usePrayerCreateModal();
  const { controlledProps: deleteControlledProps } = usePrayerDeleteModal();
  const { controlledProps: categoryControlledProps } = useCategoryCreateModal();
  const { controlledProps: categoryEditControlledProps } =
    useCategoryEditModal();

  useEffect(() => {
    const focusedElement = document.activeElement;
    if (
      focusedElement &&
      (focusedElement.tagName === "INPUT" ||
        focusedElement.tagName === "TEXTAREA")
    ) {
      focusedElement.blur();
    }
  }, []);

  useReceive();

  return (
    <MainWrapper bgColor={BG_COLOR_MAP[tab]}>
      <MainLocker />
      <MainChangeCategoryOrder />

      <MainDotOptions />

      <PrayerBottomModal {...bottomControlledProps} />
      <PrayerInputModal {...modifyControlledProps} />
      <PrayerInputModal {...createControlledProps} />
      <PrayerDeleteModal {...deleteControlledProps} />
      <CategoryInputModal {...categoryControlledProps} />
      <CategoryInputModal {...categoryEditControlledProps} />

      <MainHeader />
      <ScrollSynchronizedPrayerList
        isSharedPrayers={tab === "shared"}
        categoriesWithPrayers={prayList}
      />
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  height: 100vh;
  width: 100%;

  background-color: ${({ bgColor }) => bgColor};
`;
