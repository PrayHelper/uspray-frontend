import { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../Category/Category";
import CategoryTag from "../CategoryTag/CategoryTag";
import completeImage from "../../images/check_img.svg";
import deleteImage from "../../images/delete_img.svg";
import modifyImage from "../../images/modify_img.svg";
import { usePray } from "../../hooks/usePray";
import { ToastTheme } from "../../components/Toast/Toast";
import BlackScreen from "../BlackScreen";
import Modal from "../Modal/Modal";
import useToast from "../../hooks/useToast";
import PrayDateCategoryInput from "../PrayDateCategoryInput/PrayDateCategoryInput";

const MainContent = ({
  categoryList,
  setShowCategorySetting,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  tabType,
  onDotIconClicked,
  setClickedCategoryData,
}) => {
  const [selectedPrayInfo, setSelectedPrayInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  // 기도제목 수정할 때 아래 기도 정보 사용
  const [modifyPrayInfo, setModifyPrayInfo] = useState(null);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const { prayList, deletePray, completePray, modifyPray } = usePray(tabType);
  const { showToast } = useToast({});

  const prayModify = () => {
    setModifyPrayInfo(selectedPrayInfo);
    setSelectedPrayInfo(null);
  };

  useEffect(() => {
    if (modifyPrayInfo === null) {
      console.log("modifyPrayInfo", modifyPrayInfo);
      return;
    }
    setPrayInputValue(modifyPrayInfo.content);
    setDateInputValue(modifyPrayInfo.deadline);
    setCategoryInputValue(modifyPrayInfo.categoryId);
    setShowSubModal(true);
  }, [modifyPrayInfo]);

  // 기도를 수정하는 함수
  const onModify = async (text, deadline, categoryId) => {
    modifyPray(
      { content: text, deadline: deadline, categoryId: categoryId },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setPrayInputValue("");
          setDateInputValue(null);
          setSelectedCategoryIndex(categoryId);
        },
      }
    );
  };

  return (
    <MainContentWrapper>
      {showModal && (
        <>
          <BlackScreen
            isModalOn={showModal}
            onClick={() => setShowModal(false)}
          />
          <Modal
            isModalOn={showModal}
            iconSrc={"images/ic_group_pray_delete.svg"}
            iconAlt={"group_pray_delete"}
            mainContent={"정말 삭제하시겠습니까?"}
            subContent={"선택한 기도제목이 삭제됩니다."}
            btnContent={"삭제"}
            btnContent2={"취소"}
            onClickBtn={() => {
              deletePray(selectedPrayInfo.prayId, {
                onSuccess: () => {
                  setShowModal(false);
                  setSelectedPrayInfo(null);
                },
              });
            }}
            onClickBtn2={() => setShowModal(false)}
            modalTheme={2}
          />
        </>
      )}
      {showSubModal && (
        <PrayDateCategoryInput
          categoryList={categoryList}
          showSubModal={showSubModal}
          setShowSubModal={setShowSubModal}
          inputPlaceHodler={modifyPrayInfo.content}
          maxrow={3}
          maxlen={75}
          isShowWordCount={true}
          isDefault={modifyPrayInfo.isShared}
          setUpdateValue={setPrayInputValue}
          setUpdateDate={setDateInputValue}
          setUpdateCategory={setCategoryInputValue}
          buttonText="기도제목 수정"
          value={prayInputValue}
          data={modifyPrayInfo.deadline}
          category={modifyPrayInfo.categoryId}
          onClickFunc={() =>
            onModify(prayInputValue, dateInputValue, categoryInputValue)
          }
        />
      )}
      <TopWrapper>
        <CategoryTag
          categoryList={categoryList}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
          setShowCategorySetting={setShowCategorySetting}
          canAdd={true}
        />
      </TopWrapper>
      <Content>
        {prayList &&
          prayList.map((category, index) => (
            <Category
              key={index}
              categoryId={category.categoryId}
              title={category.categoryName}
              prays={category.prays}
              color={category.categoryColor}
              setSelectedPrayInfo={setSelectedPrayInfo}
              onDotIconClicked={onDotIconClicked}
              setClickedCategoryData={setClickedCategoryData}
              setShowSubModal={setShowSubModal}
            />
          ))}
      </Content>
      <BottomSetWrapper selectedPrayInfo={selectedPrayInfo}>
        <BottomButtonWrapper>
          <img src={completeImage} />
          <BottomButtonText
            color={"green"}
            onClick={() => {
              completePray(selectedPrayInfo.prayId);
              showToast({
                message: "기도제목을 완료했어요.",
                theme: ToastTheme.SUCCESS,
              });
              setSelectedPrayInfo(null);
            }}
          >
            완료하기
          </BottomButtonText>
        </BottomButtonWrapper>
        <BottomButtonWrapper>
          <img src={modifyImage} />
          <BottomButtonText
            color={"blue"}
            onClick={() => prayModify(selectedPrayInfo)}
          >
            수정하기
          </BottomButtonText>
        </BottomButtonWrapper>
        <BottomButtonWrapper>
          <img src={deleteImage} />
          <BottomButtonText color={"red"} onClick={() => setShowModal(true)}>
            삭제하기
          </BottomButtonText>
        </BottomButtonWrapper>
      </BottomSetWrapper>
      <BlackBackground
        selectedPrayInfo={selectedPrayInfo}
        onClick={() => setSelectedPrayInfo(null)}
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
  bottom: ${(props) => (props.selectedPrayInfo == null ? "-100%" : "0px")};
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
  z-index: ${(props) => (props.selectedPrayInfo !== null ? 100 : 0)};
  opacity: ${(props) => (props.selectedPrayInfo !== null ? 1 : 0)};
  backdrop-filter: blur(4px);
  pointer-events: ${(props) =>
    props.selectedPrayInfo !== null ? "auto" : "none"};
`;
