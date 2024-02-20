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
import useBottomNav from "../../hooks/useBottomNav";

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
  setShowOption,
  setShareMode,
  listHandler,
  setIsPraySelected,
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
  const { setIsVisible } = useBottomNav();

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
    if (showSubModal || showModal) {
      setIsPraySelected(true);
      setIsVisible(false);
    } else {
      setIsPraySelected(false);
      setIsVisible(true);
    }
  }, [showSubModal, showModal]);

  useEffect(() => {
    if (showModal) {
      setIsPraySelected(true);
      setIsVisible(false);
    } else {
      setIsPraySelected(false);
      setIsVisible(true);
    }
  }, [showModal]);

  useEffect(() => {
    if (!shareMode) setCheckedList([]);
  }, [shareMode]);

  // 기도를 수정하는 함수
  const onModify = async (text, deadline, categoryId) => {
    modifyPray(
      {
        prayId: modifyPrayInfo.prayId,
        content: text,
        deadline: deadline,
        categoryId: categoryId,
      },
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
    setShowModal(false);
    setSelectedPrayInfo(null);
  };

  const onDelete = () => {
    setSelectedPrayInfo(null);
    setShowModal(true);
  };

  const clickShareButton = () => {
    if (checkedList.length !== 0) {
      listHandler(checkedList);
    }
  };

  const clickBlackBackground = () => {
    if (!shareMode) {
      setSelectedPrayInfo(null);
    }
  };

  return (
    <>
      <MainContentWrapper shareMode={shareMode}>
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
              onClickBtn2={onCancle}
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
            date={modifyPrayInfo.deadline}
            category={modifyPrayInfo.categoryId}
            onClickFunc={() =>
              onModify(prayInputValue, dateInputValue, categoryInputValue)
            }
          />
        )}

        <TopWrapper shareMode={shareMode}>
          <CategoryTag
            categoryList={categoryList}
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
            setShowCategorySetting={setShowCategorySetting}
            canAdd={!shareMode}
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
                setShowOption={setShowOption}
                setCheckedList={setCheckedList}
                checkedList={checkedList}
              />
            ))}
        </Content>
      </MainContentWrapper>
      <BottomSetWrapper
        selectedPrayInfo={selectedPrayInfo}
        showModal={showModal}
      >
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
          <BottomButtonText color={"red"} onClick={() => onDelete()}>
            삭제하기
          </BottomButtonText>
        </BottomButtonWrapper>
      </BottomSetWrapper>
      <BottomShareWrapper shareMode={shareMode}>
        <ShareNumberText>{checkedList.length + "개 선택"}</ShareNumberText>
        <ShareButtonContainer>
          <ShareButtonWrapper
            disabled={true}
            color={"white"}
            onClick={onCancle}
          >
            취소하기
            <ShareButtonImage src="images/ic_share_cancel.svg" />
          </ShareButtonWrapper>
          <ShareButtonWrapper
            disabled={checkedList.length === 0}
            color={"green"}
            onClick={clickShareButton}
          >
            공유하기
            <ShareButtonImage src="images/ic_share_move.svg" />
          </ShareButtonWrapper>
        </ShareButtonContainer>
      </BottomShareWrapper>
      <BlackBackground
        selectedPrayInfo={selectedPrayInfo}
        shareMode={shareMode}
        onClick={clickBlackBackground}
        showModal={showModal}
      />
    </>
  );
};

export default MainContent;

// 전체 흰색 박스(카테고리 목록 ~ 기도제목 목록)
const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 139px);
  width: 100%;
  position: fixed;
  top: 139px;
  background-color: var(--color-white);
  border-radius: 32px 32px 0px 0px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: ${(props) => (props.shareMode ? 200 : "auto")};
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// 카테고리 덮개
const TopWrapper = styled.div`
  display: flex;
  padding: 24px 16px 16px;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  z-index: ${(props) => (props.shareMode ? 201 : 50)};
  backdrop-filter: blur(12px);
  border: ${(props) =>
    props.shareMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
  box-shadow: ${(props) =>
    props.shareMode ? "0px 0px 4px rgba(0, 0, 0, 0.1)" : "none"};
`;

// 카테고리 박스
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 16px 124px;
`;

// 기도제목 눌렀을 때 아래에서 나오는 옵션 박스
const BottomSetWrapper = styled.div`
  display: flex;
  position: fixed;
  box-sizing: border-box;
  justify-content: center;
  gap: 18px;
  width: 100%;
  padding: 37px 24px;
  transition: all 0.3s ease-in-out;
  bottom: ${(props) =>
    props.selectedPrayInfo === null || props.showModal ? "-100%" : "0px"};
  z-index: 202;
  border-radius: 24px 24px 0px 0px;
  background: #fff;
`;

// BottomSetWrapper의 버튼
const BottomButtonWrapper = styled.button`
  flex-grow: 1;
  padding: 12px 28px;
  border-radius: 16px;
  background: #f8f8f8;
  border: none;
`;

// BottomSetWrapper의 Text
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

// ShareMode일 때 아래에서 나오는 옵션 박스
const BottomShareWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 1;
  bottom: 0;
  heigth: 128px;
  border: none;
  background-color: white;
  border-radius: 24px 24px 0px 0px;
  z-index: 202;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.shareMode ? 1 : 0)};
  visibility: ${(props) => (props.shareMode ? "visible" : "hidden")};
  transform: ${(props) =>
    props.shareMode ? "translateY(0%)" : "translateY(100%)"};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

// BottomShareWrapper의 버튼 컨테이너
const ShareButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  heigth: 75px;
  border: none;
  gap: 14px;
  margin-top: 8px;
  padding: 0px 24px 12px 24px;
  box-sizing: border-box;
`;

// BottomShareWrapper의 버튼
const ShareButtonWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 12px;
  border: ${(props) =>
    props.color === "white" ? "1px solid var(--color-dark-green)" : "none"};
  background-color: ${(props) =>
    props.color === "white"
      ? "var(--color-white)"
      : props.disabled
      ? "var(--color-light-green)"
      : "var(--color-dark-green)"};
  color: ${(props) =>
    props.color === "white" ? "var(--color-dark-green)" : "var(--color-white)"};
  border-radius: 16px;
  font-weight: 700;
  font-size: 16px;
`;

// BottomShareWrapper의 버튼의 이미지
const ShareButtonImage = styled.img`
  height: 16px;
  width: 16px;
  margin-left: 20px;
`;

// BottomShareWrapper의 글자(ㅇ개 선택)
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

// BottomSetWrapper와 BottomShareWrapper의 Background
const BlackBackground = styled.div`
  transition: all 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (!props.showModal ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${(props) =>
    props.selectedPrayInfo !== null ? 100 : props.shareMode ? 198 : 0};
  opacity: ${(props) =>
    props.selectedPrayInfo !== null || props.shareMode ? 1 : 0};
  backdrop-filter: blur(4px);
  pointer-events: ${(props) =>
    props.selectedPrayInfo !== null || props.shareMode ? "auto" : "none"};
`;
