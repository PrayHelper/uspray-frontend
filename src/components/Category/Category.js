import React, { useState } from "react";
import styled from "styled-components";
import Button, { ButtonSize } from "../Button/Button";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showCategorySetting, setShowCategorySetting] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  
  const addCategory = () => {
    if(inputValue !== '') {
      setCategories([...categories, inputValue]);
      setInputValue('');
      setShowCategorySetting(false);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleCategoryClick = (index) => {
    setSelectedCategoryIndex(index);
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  

  return (
    <Container>
      {categories.map((category, index) => (
        <CategoryBox 
          key={index}
          selected={index === selectedCategoryIndex} 
          onClick={() => handleCategoryClick(index)}
          >
          {category}
        </CategoryBox>
      ))}
      {showCategorySetting && (
        <CategorySetting  onClick={() => setShowCategorySetting(false)}>
          <Input type="text" value={inputValue} placeholder="카테고리를 입력해주세요" onChange={handleInputChange} onClick={handleInnerClick}/>
          <div style={{position: "fixed", bottom: "64px", width: "calc(100% - 32px)"}} onClick={handleInnerClick}>
            <Button buttonSize={ButtonSize.LARGE} handler={addCategory}>카테고리 추가</Button>
          </div>
        </CategorySetting>
      )}
      <AddButton onClick={() => setShowCategorySetting(true)}>
        추가
        <img src="images/ic_add.svg" alt="add_icon"/>
      </AddButton>
    </Container>
  );
};

export default Category;

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
  background-color: ${props => props.selected ? '#75BD62' : '#EEEEEE'};
  color: ${props => props.selected ? '#FFFFFF' : '#CECECE'};
  border-radius: 24px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
`;

const AddButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: transparent;
  border: 1px solid #75BD62;
  border-radius: 24px;
  padding: 16px;
  color: #75BD62;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
`;

const Input = styled.input`
  width: calc(100%-16px);
  height: 55px;
  border-radius: 16px;
  padding: 0px 16px;
  ::placeholder {
    color: var(--color-secondary-green);
    font-weight: 400;
  }
  outline: none;
  border: 0;
  color: var(--color-green);
  font-weight: 500;
  
`;


const CategorySetting = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

