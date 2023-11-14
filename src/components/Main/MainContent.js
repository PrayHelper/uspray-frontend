import { useState } from "react";
import styled from "styled-components";
import Category from "../Category/Category";
import CategoryTag from "../CategoryTag/CategoryTag";

const MainContent = ({categories, setCategories, setShowCategorySetting}) => {

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  return (
    <MainContentWrapper>
      <div style={{display: "flex", padding: "24px 16px 16px 16px", position: "sticky", top: "0", backgroundColor: "rgba(255, 255, 255, 0.85)", borderRadius: "24px 24px 0 0", zIndex: "50", backdropFilter: "blur(12px)"}}>
        <CategoryTag categories={categories} setCategories={setCategories} selectedCategoryIndex={selectedCategoryIndex} setSelectedCategoryIndex={setSelectedCategoryIndex} setShowCategorySetting={setShowCategorySetting} />
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: "24px", padding: "8px 16px 60px 16px"}}>
        <Category title="테스트" color="#75BD62" />
        <Category title="테스트2" color="#AEDBA5" />
      </div>
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

  // Chrome, Edge 등
  &::-webkit-scrollbar {
    display: none;
  }
  // Firefox
  scrollbar-width: none;
  // IE, Edge
  -ms-overflow-style: none;
`;
