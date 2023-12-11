import { useState } from "react";
import styled from "styled-components";
import Category from "../Category/Category";
import CategoryTag from "../CategoryTag/CategoryTag";
import completeImage from "../../images/check_img.svg";
import deleteImage from "../../images/delete_img.svg";
import modifyImage from "../../images/modify_img.svg";

const MainContent = ({ categories, setCategories, setShowCategorySetting }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(null);

  const prayComplete = () => {
    // 기도 완료하는 api
  };

  const prayModify = () => {
    // 기도 수정하는 api
  };

  const prayDeleted = () => {
    // 기도 삭제하는 api
  };
  return (
    <MainContentWrapper>
      <TopWrapper>
        <CategoryTag
          categories={categories}
          setCategories={setCategories}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
          setShowCategorySetting={setShowCategorySetting}
        />
      </TopWrapper>
      <Content>
        <Category
          title="테스트"
          color="#75BD62"
          setSelectedTitleIndex={setSelectedTitleIndex}
        />
        <Category
          title="테스트2"
          color="#AEDBA5"
          setSelectedTitleIndex={setSelectedTitleIndex}
        />
      </Content>
      <BottomSetWrapper selectedTitleIndex={selectedTitleIndex}>
        <BottomButtonWrapper>
          <img src={completeImage} />
          <BottomButtonText color={"green"} onClick={() => prayComplete()}>
            완료하기
          </BottomButtonText>
        </BottomButtonWrapper>
        <BottomButtonWrapper>
          <img src={modifyImage} />
          <BottomButtonText color={"blue"} onClick={() => prayModify()}>
            수정하기
          </BottomButtonText>
        </BottomButtonWrapper>
        <BottomButtonWrapper>
          <img src={deleteImage} />
          <BottomButtonText color={"red"} onClick={() => prayDeleted()}>
            삭제하기
          </BottomButtonText>
        </BottomButtonWrapper>
      </BottomSetWrapper>
      <BlackBackground
        selectedTitleIndex={selectedTitleIndex}
        onClick={() => setSelectedTitleIndex(null)}
      />
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

const BottomSetWrapper = styled.div`
  display: flex;
  position: fixed;
  box-sizing: border-box;
  justify-content: center;
  gap: 18px;
  width: 100%;
  padding: 37px 24px;
  transition: all 0.3s ease-in-out;
  bottom: ${(props) => (props.selectedTitleIndex == null ? "-100%" : "0px")};
  z-index: 101;
  border-radius: 24px 24px 0px 0px;
  background: #fff;
`;

const BottomButtonText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) =>
    props.color == "green"
      ? "#27CD2F"
      : props.color == "blue"
      ? "#408CFF"
      : "#FF4F4F"};
`;

const BottomButtonWrapper = styled.button`
  flex-grow: 1;
  padding: 12px 28px;
  border-radius: 16px;
  background: #f8f8f8;
  border: none;
`;

const BlackBackground = styled.div`
  transition: all 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${(props) => (props.selectedTitleIndex !== null ? 100 : 0)};
  opacity: ${(props) => (props.selectedTitleIndex !== null ? 1 : 0)};
  backdrop-filter: blur(4px);
  pointer-events: ${(props) =>
    props.selectedTitleIndex !== null ? "auto" : "none"};
`;
