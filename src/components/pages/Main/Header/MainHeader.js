import S from "./MainHeader.style";
import { mainModeAtom, mainTabAtom } from "../../../../pages/Main";
import { useAtom, useSetAtom } from "jotai";
import usePrayerCreateModal from "../../../../overlays/PrayerInputModal/usePrayerCreateModal";
import { useFetchSharedList } from "../../../../hooks/useFetchSharedList";

const TAB_TEXT_MAP = {
  personal: "내가 쓴",
  shared: "공유 받은",
};

const TAB_LIST = ["personal", "shared"];

const MainHeader = () => {
  const [tab, setTab] = useAtom(mainTabAtom);

  const { open: openCreateModal } = usePrayerCreateModal();

  const selectTab = (tabParam) => setTab(tabParam);

  const setMainMode = useSetAtom(mainModeAtom);

  const { sharedListData } = useFetchSharedList();

  return (
    <S.HeaderRootContainer>
      <S.TabList>
        {TAB_LIST.map((tabItem) => (
          <S.TabItem
            key={tabItem}
            active={tab === tabItem}
            onClick={() => selectTab(tabItem)}>
            {TAB_TEXT_MAP[tabItem]}
          </S.TabItem>
        ))}
      </S.TabList>
      <S.BottomAreaWrapper>
        {tab === "personal" ? (
          <S.Input
            type="text"
            placeholder="기도제목을 입력해주세요"
            readOnly
            onClick={openCreateModal}
          />
        ) : (
          <S.MoveToLockerButton onClick={() => setMainMode("LOCKER")}>
            보관함에 {sharedListData.length}개의 기도제목이 있어요
          </S.MoveToLockerButton>
        )}
      </S.BottomAreaWrapper>
    </S.HeaderRootContainer>
  );
};

// const MainHeader = ({
//   isShowInputModal,
//   setIsShowInputModal,
//   handleTabChange,
//   currentTab, // "내가 쓴" or "공유 받은"
//   onClickPrayInput,
//   categoryList,
//   createPray,
//   setSelectedCategoryIndex,
//   setCurrentOverlay,
//   sharedDataLength,
// }) => {
//   return (
//     <S.HeaderRootContainer>
//       <S.TabList>
//         {["내가 쓴", "공유 받은"].map((tabItem) => (
//           <S.TabItem
//             key={tabItem}
//             active={currentTab === tabItem}
//             onClick={() => handleTabChange(tabItem)}>
//             {tabItem}
//           </S.TabItem>
//         ))}
//       </S.TabList>
//       <S.BottomAreaWrapper>
//         <HeaderBottomAreaContent
//           {...{
//             categoryList,
//             createPray,
//             currentTab,
//             isShowInputModal,
//             onClickPrayInput,
//             setIsShowInputModal,
//             setSelectedCategoryIndex,
//             setCurrentOverlay,
//             sharedDataLength,
//           }}
//         />
//       </S.BottomAreaWrapper>
//     </S.HeaderRootContainer>
//   );
// };

export default MainHeader;
