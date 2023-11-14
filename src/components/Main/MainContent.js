import { useState } from "react";
import styled from "styled-components";
import CategoryTag from "../CategoryTag/CategoryTag";

const MainContent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  return (
    <MainContentWrapper>
      <div style={{display: "flex", marginTop: "8px", paddingBottom: "16px"}}>
        <CategoryTag categories={categories} setCategories={setCategories} selectedCategoryIndex={selectedCategoryIndex} setSelectedCategoryIndex={setSelectedCategoryIndex} />
      </div>
      <div>
        카테고리에 따른 기도제목 목록
        {categories[selectedCategoryIndex].name}
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
  padding: 16px;
  box-sizing: border-box;
`;
