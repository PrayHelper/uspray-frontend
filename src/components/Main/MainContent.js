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
  categoryRef,
  setCategoryRefIndex,
  shareMode,
  setShareMode,
  listHandler,
}) => {
  const [selectedPrayInfo, setSelectedPrayInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  // 기도제목 수정할 때 아래 기도 정보 사용
  const [modifyPrayInfo, setModifyPrayInfo] = useState(null);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const { prayList, deletePray, completePray, modifyPray } = usePray(tabType);
  const { showToast } = useToast({});

  const prayModify = () => {
    setModifyPrayInfo(selectedPrayInfo);
    setSelectedPrayInfo(null);
  };

  useEffect(() => {
    if (modifyPrayInfo) {
      setPrayInputValue(modifyPrayInfo.content);
      setDateInputValue(modifyPrayInfo.deadline);
      setCategoryInputValue(modifyPrayInfo.categoryId);
      setShowSubModal(true);
    }
  }, [modifyPrayInfo]);

  useEffect(() => {
    if (!shareMode) setCheckedList([]);
  }, [shareMode]);

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

  const onCancle = () => {
    setShareMode(false);
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
          setCategoryRefIndex={setCategoryRefIndex}
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
              tabType={tabType}
              categoryRef={categoryRef}
              refIndex={index}
              shareMode={shareMode}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
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
      <BottomShareWrapper shareMode={shareMode}>
        <ShareNumberText>{checkedList.length + "개 선택"}</ShareNumberText>
        <ShareSubContainer>
          <BottomShareButton onClick={() => onCancle()}>
            취소하기
            <ShareClickLogo src="images/ic_share_cancel.svg" />
          </BottomShareButton>
          {checkedList.length === 0 ? (
            <BottomShareButton
              style={{
                backgroundColor: "var(--color-light-green)",
                color: "#FFFFFF",
                border: "1px solid #FFFFFF",
              }}
            >
              공유하기
              <ShareClickLogo src="images/ic_share_move.svg" />
            </BottomShareButton>
          ) : (
            <BottomShareButton
              style={{
                background: "var(--color-dark-green)",
                color: "#FFFFFF",
              }}
              onClick={() => listHandler(checkedList)}
            >
              공유하기
              <ShareClickLogo src="images/ic_share_move.svg" />
            </BottomShareButton>
          )}
        </ShareSubContainer>
      </BottomShareWrapper>
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

const BottomShareButton = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 12px;
  border: 1px solid var(--color-dark-green);
  border-radius: 16px;
  color: var(--color-dark-green);
  font-weight: 700;
  font-size: 16px;
`;

const BottomShareWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 1;
  bottom: 0;
  heigth: 128px;
  border: none;
  background-color: white;
  border-radius: 24px 24px 0px 0px;
  z-index: 103;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.shareMode ? 1 : 0)};
  visibility: ${(props) => (props.shareMode ? "visible" : "hidden")};
  transform: ${(props) =>
    props.shareMode ? "translateY(0%)" : "translateY(100%)"};
`;

const ShareSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  heigth: 75px;
  border: none;
  z-index: 101;
  gap: 14px;
  margin-top: 8px;
  padding: 0px 24px 12px 24px;
  box-sizing: border-box;
`;
const ShareNumberText = styled.div`
  height: 17px;
  display: flex;
  font-weight: 700;
  font-size: 12px;
  color: var(--color-dark-green);
  margin-right: 26px;
  margin-top: 12px;
  flex-direction: row-reverse;
`;
const ShareClickLogo = styled.img`
  height: 16px;
  width: 16px;
  margin-left: 20px;
`;
