import React, { useEffect } from "react";
import styled from "styled-components";

const CategoryTag = ({
  categoryList,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  setShowCategorySetting,
  canAdd,
  setCategoryRefIndex,
}) => {
  const handleCategoryClick = (categoryId, index) => {
    setSelectedCategoryIndex(categoryId);
    setCategoryRefIndex(index);
  };

  return (
    <Container>
      {categoryList &&
        categoryList.map((category, index) => (
          <CategoryBox
            key={category.id}
            selected={category.id === selectedCategoryIndex}
            color={category.color}
            onClick={() => handleCategoryClick(category.id, index)}
          >
            {category.name}
          </CategoryBox>
        ))}
      {canAdd && (
        <AddButton
          onClick={() => {
            setShowCategorySetting(true);
          }}
        >
          추가
          <img src="images/ic_add.svg" alt="add_icon" />
        </AddButton>
      )}
    </Container>
  );
};

export default CategoryTag;

const Container = styled.div`
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
`;

const CategoryBox = styled.div`
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
`;

const AddButton = styled.button`
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
`;
