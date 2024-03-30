import completeImage from "../../images/check_img.svg";
import deleteImage from "../../images/delete_img.svg";
import modifyImage from "../../images/modify_img.svg";
import { useEffect, useRef, useState } from "react";
import { usePray } from "../../hooks/usePray";
import useToast from "../../hooks/useToast";
import useBottomNav from "../../hooks/useBottomNav";
import CategoryTag from "../CategoryTag/CategoryTag";
import MainCategory from "../pages/Main/Category/MainCategory";
import PrayDateCategoryInput from "../PrayDateCategoryInput/PrayDateCategoryInput";
import BlackScreen from "../BlackScreen";
import { Modal } from "@mui/material";
import { ToastTheme } from "../Toast/Toast";
import S from "./ScrollSynchronizedCategoryList.style";
import {
  ScrollingProvider,
  Section,
  useScrollSections,
} from "../../lib/react-scroll-section";
import { useAtom } from "jotai";
import { mainPageAtom } from "../../pages/Main";

const VerticalCategories = ({
  prayList,
  setSelectedPrayInfo,
  setClickedCategoryData,
  tabType,
  categoryRef,
  shareMode,
  setCheckedList,
  checkedList,
}) => {
  const sections = useScrollSections();

  return prayList.map((category, index) => (
    <Section key={category.categoryId} id={category.categoryId}>
      <MainCategory
        key={index}
        categoryId={category.categoryId}
        title={category.categoryName}
        prays={category.prays}
        color={category.categoryColor}
        setSelectedPrayInfo={setSelectedPrayInfo}
        setClickedCategoryData={setClickedCategoryData}
        tabType={tabType}
        categoryRef={categoryRef}
        refIndex={index}
        shareMode={shareMode}
        setCheckedList={setCheckedList}
        checkedList={checkedList}
      />
    </Section>
  ));
};

export const ScrollListNext = () => {
  const [pageState, setPageState] = useAtom(mainPageAtom);
  const {
    activeOverlays,
    prayerInput,
    showBottomDotOptions,
    showPrayerHandleBottomModal,
    showPrayerInputModal,
  } = pageState;

  return <></>;
};

const ScrollSynchronizedCategoryList = ({
  categoryList,
  setShowCategorySetting,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  tabType,
  setClickedCategoryData,
  categoryRef,
  setCategoryRefIndex,
  shareMode,
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
  const contentRef = useRef(null);

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
  }, [showSubModal, showModal, setIsPraySelected, setIsVisible]);

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

  const onCancel = () => {
    setShareMode(false);
    setShowModal(false);
    setSelectedPrayInfo(null);
  };

  const onDelete = () => {
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
      <S.MainContentWrapper shareMode={shareMode}>
        <BlackScreen
          isModalOn={showModal}
          onClick={() => setShowModal(false)}
        />
        {showModal && (
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
            onClickBtn2={onCancel}
            modalTheme={2}
          />
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
        {prayList && (
          <ScrollingProvider
            offset={contentRef.current?.getBoundingClientRect().top}>
            <S.TopWrapper shareMode={shareMode}>
              <CategoryTag
                categoryList={categoryList}
                selectedCategoryIndex={selectedCategoryIndex}
                setSelectedCategoryIndex={setSelectedCategoryIndex}
                setShowCategorySetting={setShowCategorySetting}
                canAdd={!shareMode}
                setCategoryRefIndex={setCategoryRefIndex}
              />
            </S.TopWrapper>
            <S.Content ref={contentRef}>
              <VerticalCategories
                {...{
                  categoryRef,
                  checkedList,
                  setCheckedList,
                  shareMode,
                  setSelectedPrayInfo,
                  setClickedCategoryData,
                  tabType,
                  prayList,
                }}
              />
            </S.Content>
          </ScrollingProvider>
        )}
      </S.MainContentWrapper>
      <S.BottomSetWrapper
        selectedPrayInfo={selectedPrayInfo}
        showModal={showModal}>
        <S.BottomButtonWrapper>
          <img src={completeImage} alt="" />
          <S.BottomButtonText
            color={"green"}
            onClick={() => {
              completePray(selectedPrayInfo.prayId);
              showToast({
                message: "기도제목을 완료했어요.",
                theme: ToastTheme.SUCCESS,
              });
              setSelectedPrayInfo(null);
            }}>
            완료하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={modifyImage} alt="" />
          <S.BottomButtonText
            color={"blue"}
            onClick={() => prayModify(selectedPrayInfo)}>
            수정하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={deleteImage} alt="" />
          <S.BottomButtonText color={"red"} onClick={() => onDelete()}>
            삭제하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
      </S.BottomSetWrapper>
      <S.BottomShareWrapper shareMode={shareMode}>
        <S.ShareNumberText>{checkedList.length + "개 선택"}</S.ShareNumberText>
        <S.ShareButtonContainer>
          <S.ShareButtonWrapper
            disabled={true}
            color={"white"}
            onClick={onCancel}>
            취소하기
            <S.ShareButtonImage src="images/ic_share_cancel.svg" />
          </S.ShareButtonWrapper>
          <S.ShareButtonWrapper
            disabled={checkedList.length === 0}
            color={"green"}
            onClick={clickShareButton}>
            공유하기
            <S.ShareButtonImage src="images/ic_share_move.svg" />
          </S.ShareButtonWrapper>
        </S.ShareButtonContainer>
      </S.BottomShareWrapper>
      <S.BlackBackground
        selectedPrayInfo={selectedPrayInfo}
        shareMode={shareMode}
        onClick={clickBlackBackground}
        showModal={showModal}
      />
    </>
  );
};

export default ScrollSynchronizedCategoryList;
