import styled from "styled-components";
import { useMainStates } from "../../../pages/Main";
import { forwardRef } from "react";
import { useContext } from "react";
import { MainNextContext } from "../ScrollSynchronizedCategoryList";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const CategoryBox = ({ category }) => {
  const { id, color, name } = category;

  const { registerTopRef, unregisterTopRef, selectedId, handleTopItemClick } =
    useContext(MainNextContext);

  const ref = useMemo(() => registerTopRef({ id }), [registerTopRef, id]);

  const firstCalled = useRef(false);

  useEffect(() => {
    // StrictMode 대응을 위한 trick
    setTimeout(() => {
      firstCalled.current = true;
    });

    return () => {
      if (firstCalled.current) unregisterTopRef(id);
    };
  }, [unregisterTopRef, id]);

  return (
    <S.CategoryBox
      id={id}
      ref={ref}
      selected={selectedId === String(id)}
      key={id}
      color={color}
      onClick={() => handleTopItemClick(id)}>
      {name}
    </S.CategoryBox>
  );
};

const TopHorizontalCategories = forwardRef((_, ref) => {
  const { setActiveOverlays, categoryList } = useMainStates();

  const activateCategorySetting = () =>
    setActiveOverlays(["CATEGORY_CREATE_MODAL"]);

  return (
    <S.TopWrapper>
      <S.ListContainer ref={ref}>
        {categoryList.map((category) => (
          <CategoryBox category={category} />
        ))}
        <S.AddButton onClick={activateCategorySetting}>
          추가
          <img src="images/ic_add.svg" alt="add_icon" />
        </S.AddButton>
      </S.ListContainer>
    </S.TopWrapper>
  );
});

export default TopHorizontalCategories;

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
  CategoryBox: styled.div`
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
