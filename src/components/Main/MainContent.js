import { useState } from "react";
import styled from "styled-components";
import Category from "../Category/Category";
import CategoryTag from "../CategoryTag/CategoryTag";

const MainContent = ({categories, setCategories, setShowCategorySetting, onlyCategoryTags}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  
  return (
    <MainContentWrapper>
      <TopWrapper>
        <CategoryTag 
          categories={categories} 
          setCategories={setCategories} 
          selectedCategoryIndex={selectedCategoryIndex} 
          setSelectedCategoryIndex={setSelectedCategoryIndex} 
          setShowCategorySetting={setShowCategorySetting} 
          onlyCategoryTags={onlyCategoryTags}
        />
      </TopWrapper>
      <Content>
        <Category title="테스트" color="#75BD62" />
        <Category title="테스트2" color="#AEDBA5" />
      </Content>
    </MainContentWrapper>
  );
};

export default MainContent;


const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: var(--color-white);
  border-radius: 32px 32px 0px 0px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const TopWrapper = styled.div`
  display: flex;
  padding: 24px 16px 16px;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 24px 24px 0 0;
  z-index: 50;
  backdrop-filter: blur(12px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 16px 60px;
`;
