import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import { useState, useRef, useCallback } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const Hamburger = () => (
  <S.HamburgerContainer>
    <S.HamburgerRow />
    <S.HamburgerRow />
    <S.HamburgerRow />
  </S.HamburgerContainer>
);

const ITEM = "item";

// SOURCE: https://codesandbox.io/p/sandbox/github/react-dnd/react-dnd/tree/gh-pages/examples_js/04-sortable/simple?file=%2Fsrc%2FCard.js%3A48%2C15
const CategoryItem = ({ id, label, color, index, moveItem }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ITEM,
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    previewOptions: {
      message: "드래그 중입니다.",
    },
  });

  drag(drop(ref));

  return (
    <S.CategoryItemContainer
      color={color}
      ref={ref}
      data-handler-id={handlerId}>
      <S.CategoryItemText>{label}</S.CategoryItemText>
      <Hamburger />
      {preview}
    </S.CategoryItemContainer>
  );
};

const ChangeCategoryOrder = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [categories, setCategories] = useState([
    {
      id: 1,
      label: "학교",
      color: "var(--color-green)",
      order: 1,
    },
    {
      id: 2,
      label: "가족",
      color: "var(--color-secondary-grey)",
      order: 2,
    },
    {
      id: 3,
      label: "치킨",
      color: "var(--color-secondary-grey)",
      order: 3,
    },
  ]);

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setCategories((prev) => {
      const result = [...prev];

      result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, prev[dragIndex]);

      return result;
    });
  }, []);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <S.Root>
        <UserHeader>카테고리 순서 변경</UserHeader>
        <S.CategoryList>
          {categories.map((category, i) => (
            <CategoryItem {...category} index={i} moveItem={moveItem} />
          ))}
        </S.CategoryList>
      </S.Root>
    </DndProvider>
  );
};

export default ChangeCategoryOrder;

const S = {
  Root: styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  CategoryList: styled.div`
    width: calc(100% - 32px);
    margin-top: 24px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  CategoryItemContainer: styled.div`
    background-color: ${({ color }) => color};
    color: white;
    font-weight: 700;
    font-size: 16px;
    border-radius: 8px;
    padding: 12px 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: move;
    transform: ${({ transform }) => transform};
  `,
  CategoryItemText: styled.div``,
  HamburgerContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
  `,
  HamburgerRow: styled.div`
    background-color: #ffffff80;
    border-radius: 1px;
    height: 2px;
    width: 10px;
  `,
};
