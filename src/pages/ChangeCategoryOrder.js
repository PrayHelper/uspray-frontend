import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../lib/StrictModeDroppable";
import { useEffect } from "react";
import { useCategory } from "../hooks/useCategory";

const Hamburger = () => (
  <S.HamburgerContainer>
    <S.HamburgerRow />
    <S.HamburgerRow />
    <S.HamburgerRow />
  </S.HamburgerContainer>
);

const CategoryItem = ({ categoryItem, index }) => {
  return (
    <Draggable draggableId={categoryItem.id} index={index}>
      {(provided) => (
        <S.CategoryItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <S.CategoryItemText>{categoryItem.label}</S.CategoryItemText>
          <Hamburger />
        </S.CategoryItemContainer>
      )}
    </Draggable>
  );
};

const ChangeCategoryOrder = () => {
  const [categories, setCategories] = useState([
    {
      id: "1",
      label: "학교",
      color: "var(--color-green)",
    },
    {
      id: "2",
      label: "가족",
      color: "var(--color-secondary-grey)",
    },
    {
      id: "3",
      label: "치킨",
      color: "var(--color-secondary-grey)",
    },
  ]);

  const { categoryList } = useCategory();

  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);

  const moveItem = (dragIndex, hoverIndex) => {
    setCategories((prev) => {
      const result = [...prev];

      result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, prev[dragIndex]);

      return result;
    });
  };

  const onDragEnd = ({ source, destination }) => {
    if (!source || !destination) return;

    moveItem(source.index, destination.index);
  };

  return (
    <S.Root>
      <UserHeader>카테고리 순서 변경</UserHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <S.CategoryList
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {categories.map((categoryItem, index) => (
                <CategoryItem
                  index={index}
                  key={categoryItem.id}
                  categoryItem={categoryItem}
                />
              ))}
              {provided.placeholder}
            </S.CategoryList>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </S.Root>
  );
};

export default ChangeCategoryOrder;

const S = {
  Root: styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  CategoryList: styled.div`
    width: calc(100% - 32px);

    // flex-gap 미지원 관계로 selector 이용
    & > * {
      margin-top: 15px;
    }
  `,
  CategoryItemContainer: styled.div`
    background-color: blue;

    color: white;
    font-weight: 700;
    font-size: 16px;
    border-radius: 8px;
    padding: 12px 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;
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
