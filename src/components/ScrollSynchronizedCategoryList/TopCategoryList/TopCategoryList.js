import { useContext } from "react";
import {
  PrayerListDataContext,
  PrayerListScrollingContext,
} from "../ScrollSynchronizedCategoryList";
import styled from "styled-components";
import useCategoryCreateModal from "../../../overlays/PrayerInputModal/useCategoryCreateModal";

const Item = ({ id, name, color }) => {
  const { registerTopItemRef, onClickTopItem, selectedId } = useContext(
    PrayerListScrollingContext
  );

  return (
    <S.ItemContainer
      id={id}
      ref={(node) => registerTopItemRef(id, node)}
      onClick={() => onClickTopItem(id)}
      selected={id === selectedId}
      color={color}>
      {name}
    </S.ItemContainer>
  );
};

const TopCategoryList = () => {
  const { categoriesWithPrayers } = useContext(PrayerListDataContext);
  const { open: openCategoryModal } = useCategoryCreateModal();
  const { registerTopListRef } = useContext(PrayerListScrollingContext);

  return (
    <S.TopWrapper>
      <S.ListContainer ref={(node) => registerTopListRef(node)}>
        {categoriesWithPrayers.map(
          ({ categoryId, categoryName, categoryColor }) => (
            <Item
              key={categoryId}
              id={String(categoryId)}
              name={categoryName}
              color={categoryColor}
            />
          )
        )}
        <S.AddButton onClick={openCategoryModal}>
          추가
          <img src="images/ic_add.svg" alt="add_icon" />
        </S.AddButton>
      </S.ListContainer>
    </S.TopWrapper>
  );
};

export default TopCategoryList;

const S = {
  ListContainer: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    overflow-x: auto;

    // Chrome, Edge 등
    &::-webkit-scrollbar {
      display: none;
    }
    // Firefox
    scrollbar-width: none;
    // IE, Edge
    -ms-overflow-style: none;
  `,
  // 카테고리 덮개
  TopWrapper: styled.div`
    display: flex;
    padding: 24px 16px 16px;
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 24px;
    z-index: ${(props) => (props.shareMode ? 201 : 50)};
    backdrop-filter: blur(12px);
    border: ${(props) =>
      props.shareMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
    box-shadow: ${(props) =>
      props.shareMode ? "0px 0px 4px rgba(0, 0, 0, 0.1)" : "none"};
  `,
  ItemContainer: styled.div`
    background-color: ${(props) => (props.selected ? props.color : "#EEEEEE")};
    color: ${(props) =>
      props.selected
        ? props.color === "#D0E8CB"
          ? "#A0A0A0"
          : "#FFFFFF"
        : "#CECECE"};
    border-radius: 24px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
  `,
  AddButton: styled.button`
    display: flex;
    gap: 4px;
    align-items: center;
    background-color: transparent;
    border: 1px solid #75bd62;
    border-radius: 24px;
    padding: 16px;
    color: #75bd62;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  `,
};
