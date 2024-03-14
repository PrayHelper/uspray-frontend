import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import MainContent from "../components/Main/MainContent";
import { useState } from "react";
import ButtonV2, { ButtonTheme } from "../components/ButtonV2/ButtonV2";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Modal from "../components/Modal/Modal";
import Overlay from "../components/Overlay/Overlay";
import PrayDateCategoryInput from "../components/PrayDateCategoryInput/PrayDateCategoryInput";
import { useCategory } from "../hooks/useCategory";
import { usePray } from "../hooks/usePray";
import { useLocation } from "react-router-dom";
import useFlutterWebview from "../hooks/useFlutterWebview";
import { useShare } from "../hooks/useShare";
import Locker from "./Locker";
import ChangeCategoryOrder from "./ChangeCategoryOrder";
import { useFetchSharedList } from "../hooks/useFetchSharedList";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";

const Main = () => {
  const [tab, setTab] = useState("내가 쓴");
  const [bgColor, setBgColor] = useState("#7BAB6E");

  const [showCategorySetting, setShowCategorySetting] = useState(false);

  const [showSubModal, setShowSubModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [shareMode, setShareMode] = useState(false);
  const [isLockerOverlayOn, setIsLockerOverlayOn] = useState(false);
  const [isOrderOverlayOn, setIsOrderOverlayOn] = useState(false);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const [dotIconClicked, setDotIconClicked] = useState(false);
  const [clickedCategoryData, setClickedCategoryData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const tabType = tab === "내가 쓴" ? "personal" : "shared";
  const categoryState = useCategory(tabType);
  const prayState = usePray(tabType);
  const { refetchCategoryList } = categoryState;
  const {
    categoryList,
    firstCategoryIndex,
    createCategory,
    changeCategory,
    deleteCategory,
  } = categoryState;
  const { refetchPrayList } = prayState;
  const { prayList, createPray } = prayState;
  const { shareLink, isMobile } = useFlutterWebview();
  const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const shareIdsData = query.getAll("share");
  const { mutate: receivePrays } = useShare();
  const { sharedDataLength, refetchSharedListData } = useFetchSharedList();
  const [isPraySelected, setIsPraySelected] = useState(false);

  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState(firstCategoryIndex);

  const [categoryRefIndex, setCategoryRefIndex] = useState(0);
  const categoryRef = useRef([]);
  const categoryInputRef = useRef(null);

  const { showToast } = useToast({});

  useEffect(() => {
    if (showCategorySetting && categoryInputRef.current) {
      categoryInputRef.current.focus();
      const length = categoryInputRef.current.value.length;
      categoryInputRef.current.setSelectionRange(length, length);
    }
  }, [showCategorySetting]);

  useEffect(() => {
    if (categoryRef.current[categoryRefIndex]) {
      categoryRef.current[categoryRefIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [categoryRef, categoryRefIndex]);

  const ColorList = [
    "#D0E8CB",
    "#AEDBA5",
    "#9BD88A",
    "#75BD62",
    "#649D55",
    "#58834D",
    "#507247",
  ];
  const [selectedColor, setSelectedColor] = useState(ColorList[0]);

  useEffect(() => {
    if (dotIconClicked) setInputValue(clickedCategoryData.name);
    else setInputValue("");
  }, [clickedCategoryData, dotIconClicked]);

  useEffect(() => {
    setShowOption(false);
  }, [isPraySelected]);

  useEffect(() => {
    if (ColorList.includes(clickedCategoryData.color)) {
      setSelectedColor(clickedCategoryData.color);
    } else {
      setSelectedColor(ColorList[0]);
    }
  }, [clickedCategoryData]);

  const createCategoryHandler = async (categoryData) => {
    try {
      await createCategory(categoryData);
    } catch (error) {
      console.error(error);
    } finally {
      setShowCategorySetting(false);
      setInputValue("");
    }
  };

  const changeCategoryHandler = async (data) => {
    try {
      await changeCategory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setDotIconClicked(false);
      setInputValue("");
    }
  };

  const deleteCategoryHandler = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
    } catch (error) {
      console.error(error);
    } finally {
      setDotIconClicked(false);
      setInputValue("");
    }
  };

  useEffect(() => {
    refetchCategoryList();
    refetchPrayList();
    refetchSharedListData();
    setShowOption(false);
  }, [tab]);

  useEffect(() => {
    refetchPrayList();
    setSelectedCategoryIndex(firstCategoryIndex);
  }, [categoryList]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setBgColor(newTab === "내가 쓴" ? "#7BAB6E" : "#3D5537");
  };

  const clickLocker = () => {
    setIsLockerOverlayOn(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 기도를 추가하는 함수
  const onInsert = async (text, deadline, categoryId) => {
    createPray(
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

  const onShareReceive = async (prayIds) => {
    receivePrays(
      { prayIds: prayIds },
      {
        onSuccess: () => {
          setIsLockerOverlayOn(true);
        },
      }
    );
  };

  const onShare = async (checkedPrayIds) => {
    setShareMode(false);
    const stringPrayIds = checkedPrayIds.join(",");
    var encodePrayIds = window.btoa(stringPrayIds.toString());
    if (isMobile()) {
      if (/android/i.test(navigator.userAgent)) {
        shareLink({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/main?share=` + encodePrayIds,
        });
      } else if (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        navigator.share
      ) {
        navigator.share({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/main?share=` + encodePrayIds,
        });
      } else {
        showToast({
          message: "공유하기가 지원되지 않는 환경 입니다.",
          theme: ToastTheme.ERROR,
        });
      }
    }
    console.log(`${WEB_ORIGIN}/main?share=` + encodePrayIds);
  };

  const onClickPrayInput = () => {
    if (categoryList.length === 0) {
      setShowModal(true);
    } else {
      setShowSubModal(!showSubModal);
    }
  };

  const onDotIconClicked = () => {
    setDotIconClicked(true);
  };

  useEffect(() => {
    if (shareIdsData.length === 1) {
      const decodedPrayIds = window.atob(shareIdsData[0]).split(",");
      console.log(decodedPrayIds); // dev.uspray.kr 에서 테스트 후, 삭제
      onShareReceive(decodedPrayIds);
      handleTabChange("공유 받은");
    }
    if (categoryList.length > 0) {
      setSelectedCategoryIndex(firstCategoryIndex);
    }
  }, []);

  return (
    <MainWrapper style={{ backgroundColor: bgColor }}>
      <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
      <Modal
        isModalOn={showModal}
        iconSrc={"images/icon_notice.svg"}
        iconAlt={"icon_notice"}
        mainContent={"카테고리를 먼저 추가해주세요!"}
        subContent={"기도제목은 카테고리 안에서 생성됩니다."}
        btnContent={"네, 그렇게 할게요."}
        onClickBtn={handleCloseModal}
      />
      <TopContainer>
        <TopBox>
          <TabContainer>
            <Tab
              active={tab === "내가 쓴"}
              onClick={() => handleTabChange("내가 쓴")}
            >
              내가 쓴
            </Tab>
            <Tab
              active={tab === "공유 받은"}
              onClick={() => handleTabChange("공유 받은")}
            >
              공유 받은
            </Tab>
          </TabContainer>
        </TopBox>
        <FlexContainer>
          {tab === "내가 쓴" ? (
            showSubModal ? (
              <PrayDateCategoryInput
                categoryList={categoryList}
                showSubModal={showSubModal}
                setShowSubModal={setShowSubModal}
                inputPlaceHodler="기도제목을 입력해주세요"
                maxrow={3}
                maxlen={75}
                isShowWordCount={true}
                isDefault={false}
                setUpdateValue={setPrayInputValue}
                setUpdateDate={setDateInputValue}
                setUpdateCategory={setCategoryInputValue}
                buttonText="기도제목 작성"
                value={prayInputValue}
                category={selectedCategoryIndex}
                onClickFunc={() =>
                  onInsert(prayInputValue, dateInputValue, categoryInputValue)
                }
              />
            ) : (
              <Input
                type="text"
                placeholder="기도제목을 입력해주세요"
                style={{
                  width: "100%",
                }}
                onClick={() => onClickPrayInput()}
                value={prayInputValue}
                readOnly
              />
            )
          ) : (
            <MoveToLockerButton onClick={() => clickLocker()}>
              보관함에 {sharedDataLength}개의 기도제목이 있어요
            </MoveToLockerButton>
          )}
        </FlexContainer>
      </TopContainer>
      <MainContent
        categoryList={categoryList}
        setShowCategorySetting={setShowCategorySetting}
        selectedCategoryIndex={selectedCategoryIndex}
        setSelectedCategoryIndex={setSelectedCategoryIndex}
        tabType={tabType}
        refetchPrayList={refetchPrayList}
        onDotIconClicked={onDotIconClicked}
        setClickedCategoryData={setClickedCategoryData}
        categoryRef={categoryRef}
        setCategoryRefIndex={setCategoryRefIndex}
        shareMode={shareMode}
        setShowOption={setShowOption}
        setShareMode={setShareMode}
        listHandler={onShare}
        setIsPraySelected={setIsPraySelected}
      />
      {showCategorySetting && (
        <CategorySetting onClick={() => setShowCategorySetting(false)}>
          <Input
            type="text"
            value={inputValue}
            placeholder={"카테고리를 입력해주세요"}
            onChange={handleInputChange}
            onClick={handleInnerClick}
            ref={categoryInputRef}
          />
          <FixedButtonContainer onClick={handleInnerClick}>
            <ButtonV2
              buttonTheme={ButtonTheme.FILLED}
              disabled={!inputValue}
              handler={() =>
                createCategoryHandler({
                  name: inputValue,
                  color: selectedColor,
                  type: tabType,
                })
              }
            >
              카테고리 추가
            </ButtonV2>
          </FixedButtonContainer>
          <ColorPalette>
            {ColorList.map((color) => (
              <ColorDrop
                color={color}
                selectedColor={selectedColor}
                onClick={(event) => {
                  setSelectedColor(color);
                  event.stopPropagation();
                }}
                key={color}
              />
            ))}
          </ColorPalette>
        </CategorySetting>
      )}
      {dotIconClicked && (
        <CategorySetting onClick={() => setDotIconClicked(false)}>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleInnerClick}
          />
          <FixedButtonContainer onClick={handleInnerClick}>
            <ButtonV2
              buttonTheme={ButtonTheme.OUTLINED}
              handler={() => deleteCategoryHandler(clickedCategoryData.id)}
            >
              카테고리 삭제
            </ButtonV2>
            <ButtonV2
              buttonTheme={ButtonTheme.FILLED}
              disabled={!inputValue}
              handler={() =>
                changeCategoryHandler({
                  id: clickedCategoryData.id,
                  name: inputValue,
                  color: selectedColor,
                  type: tabType,
                })
              }
            >
              카테고리 수정
            </ButtonV2>
          </FixedButtonContainer>
          <ColorPalette>
            {ColorList.map((color) => (
              <ColorDrop
                color={color}
                selectedColor={selectedColor}
                onClick={(event) => {
                  setSelectedColor(color);
                  event.stopPropagation();
                }}
                key={color}
              />
            ))}
          </ColorPalette>
        </CategorySetting>
      )}
      {isLockerOverlayOn && (
        <Overlay isOverlayOn={isLockerOverlayOn}>
          <Locker
            setIsOverlayOn={setIsLockerOverlayOn}
            refetchPrayList={refetchPrayList}
          />
        </Overlay>
      )}
      {isOrderOverlayOn && (
        <Overlay isOverlayOn={isOrderOverlayOn}>
          <ChangeCategoryOrder setIsOverlayOn={setIsOrderOverlayOn} />
        </Overlay>
      )}
      {!shareMode && !isPraySelected && (
        <>
          <OptionBtn
            src="images/ic_main_option.svg"
            alt="main_option_icon"
            onClick={() => setShowOption(true)}
            isVisible={!showOption}
            movingDistance={0}
          />
          <OptionBtn
            src="images/ic_main_option_close.svg"
            alt="main_option_close_icon"
            onClick={() => setShowOption(false)}
            isVisible={showOption}
            movingDistance={0}
          />
          <OptionBtn
            src="images/ic_main_order.svg"
            alt="main_order_icon"
            onClick={() => {
              if (categoryList.length === 0) {
                setShowModal(true);
                return;
              }
              setIsOrderOverlayOn(true);
              setShowOption(false);
            }}
            isVisible={showOption}
            movingDistance={72}
          />
        </>
      )}
      {tab === "내가 쓴" ? (
        <OptionBtn
          src="images/ic_main_share.svg"
          alt="main_share_icon"
          onClick={() => {
            setShareMode(true);
            setShowOption(false);
          }}
          isVisible={showOption}
          movingDistance={144}
        />
      ) : null}
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: #7bab6e;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Tab = styled.div`
  font-size: 24px;
  color: ${(props) => (props.active ? "#FFFFFF" : "#FFFFFF80")};
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid #FFFFFF" : "none")};
`;

const Input = styled.input`
  width: calc(100%-16px);
  height: 51px;
  border-radius: 16px;
  padding: 0px 16px;
  ::placeholder {
    color: var(--color-secondary-green);
    font-weight: 400;
  }
  outline: none;
  border: 0;
  color: var(--color-green);
  font-weight: 400;
  letter-spacing: -0.64px;
  font-size: 16px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
`;

const MoveToLockerButton = styled.div`
  width: 100%;
  padding: 14px 16px;
  background-color: #ffffff40;
  color: #ffffff;
  border-radius: 16px;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background-image: url("/images/ic_right_arrow.svg");
    background-size: contain;
  }

  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => (props.disabled ? "1" : "0.98")};
  }
`;

const CategorySetting = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  backdrop-filter: blur(8px);
`;

const ColorPalette = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-top: 8px;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 64px;
  width: calc(100% - 32px);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
    display: ${(props) =>
      props.color === props.selectedColor ? "block" : "none"};
  }
`;

const OptionBtn = styled.img`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  position: fixed;
  bottom: ${(props) =>
    props.isVisible ? `calc(80px + ${props.movingDistance}px)` : "80px"};
  right: 20px;
  transition: all 0.2s ease;
  filter: ${(props) =>
    props.isVisible ? "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))" : "none"};
`;
