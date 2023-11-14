import React, { useState } from "react";
import styled from "styled-components";
import Button, { ButtonSize } from "../Button/Button";

const CategoryTag = ({categories, setCategories, selectedCategoryIndex, setSelectedCategoryIndex}) => {

  const [inputValue, setInputValue] = useState('');
  const [showCategorySetting, setShowCategorySetting] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#D0E8CB');

  const addCategory = () => {
    if(inputValue !== '') {
      setCategories([...categories, { name: inputValue, color: selectedColor }]);
      setInputValue('');
      setSelectedColor('#D0E8CB');
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
          color={category.color}
          onClick={() => handleCategoryClick(index)}
          >
          {category.name}
        </CategoryBox>
      ))}
      {showCategorySetting && (
        <CategorySetting  onClick={() => setShowCategorySetting(false)}>
          <Input type="text" value={inputValue} placeholder="카테고리를 입력해주세요" onChange={handleInputChange} onClick={handleInnerClick}/>
          <div style={{position: "fixed", bottom: "64px", width: "calc(100% - 32px)"}} onClick={handleInnerClick}>
            <Button buttonSize={ButtonSize.LARGE} handler={addCategory}>카테고리 추가</Button>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", padding: "16px", marginTop: "8px"}}>
            <ColorDrop color={"#D0E8CB"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#D0E8CB"); event.stopPropagation();}}/>
            <ColorDrop color={"#AEDBA5"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#AEDBA5"); event.stopPropagation();}}/>
            <ColorDrop color={"#9BD88A"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#9BD88A"); event.stopPropagation();}}/>
            <ColorDrop color={"#75BD62"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#75BD62"); event.stopPropagation();}}/>
            <ColorDrop color={"#649D55"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#649D55"); event.stopPropagation();}}/>
            <ColorDrop color={"#58834D"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#58834D"); event.stopPropagation();}}/>
            <ColorDrop color={"#507247"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#507247"); event.stopPropagation();}}/>
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
  background-color: ${props => props.selected ? props.color : '#EEEEEE'};
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

const ColorDrop = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.color};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  transform: rotate(45deg);

  ::after {
    content: "";
    position: absolute;
    top: 115%;
    left: 115%;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: ${(props) => (props.color === props.selectedColor ? "block" : "none")};
`;
