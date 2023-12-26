import React, { useEffect, useState } from "react";
import PrayerContent from "./PrayerContent";
import styled from "styled-components";
import BottomMenu from "./BottomMenu";
import Share from "./Share";
import ModifyBar from "./ModifyBar";
import BackgroundBright from "./BackgroundBright";
import EmptySpace from "./EmptySpace";
import DeleteBar from "./DeleteBar";
import { usePrayList } from "../../hooks/usePrayList";
import Lottie from "react-lottie";
import LottieData from "./json/uspray.json";
import useFlutterWebview from "../../hooks/useFlutterWebview";
import Toast, { ToastTheme } from "../../components/Toast/Toast";
import PrayerSortToggle from "./PrayerSortToggle";

const Background = styled.div`
  width: 100%;
  background-color: #d0e8cb;
  height: auto;
  min-height: 100vh;
  //   margin-top: 24px;
`;

const TopContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TodayPrayer = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  margin: 44px 0px 13px 34px;
  color: #7bab6e;
`;
const BtnSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 40px;
  margin-right: 32px;
  background-color: #7bab6e;
  border: none;
  border-radius: 4px;
  padding: 4px;
`;

const BtnElementDay = styled.button`
  font-size: 10px;
  padding: 2px 6px;
  border: none;
  border-radius: 2px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BtnElementPrayer = styled.button`
  font-size: 10px;
  padding: 2px 6px;
  border: none;
  border-radius: 2px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PrayerContentStyle = styled.div`
  background-color: #ffffff;
  margin: 0px 24px;
  border-radius: 16px;
  border: 1px solid #7bab6f;
  min-height: 244px;
  padding-bottom: 20px;
`;

const ToastWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PrayerList({
  prayerContent,
  setPrayerContent,
  prayerMoreContent,
  setPrayerMoreContent,
  countUpdate,
  completeBtnClick,
  bottom_delete_click,
  modifyBtnClick,
  deleteBtnClick,
  isChecked,
  clickId,
  clickData,
  contentClick,
  isModify,
  onModify,
  isDeleted,
  onDeleted,
  valueChange,
  changeCheck,
  modalToggle,
  modalText,
  sortUpPosition,
  sortDownPosition,
  onMove,
  shareToggle,
  isShare,
  setIsShare,
  setshareToggle,
  shareLength,
  dayToggleTopDay,
  setDayToggleTopDay,
  dayToggleTopPrayer,
  setDayToggleTopPrayer,
  dayToggleBottomDay,
  setDayToggleBottomDay,
  dayToggleBottomPrayer,
  setDayToggleBottomPrayer,
  loading,
  shareList,
  Sharelist,
  setShareList,
  clickIsShare,
  clickOff,
  updateDate,
  setUpdateDate,
  dayToggle,
  setDayToggle,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [colorFirstTop, setColorFirstTop] = useState("#EBF6E8");
  const [colorSecondTop, setColorSecondTop] = useState("#7BAB6E");
  const [colorFirstBottom, setColorFirstBottom] = useState("#EBF6E8");
  const [colorSecondBottom, setColorSecondBottom] = useState("#7BAB6E");
  const padding = isChecked || isModify ? "0px" : "24px";
  const { data: prayList, refetch: refetchPrayList } = usePrayList("date");
  const { data: pray_cnt_List, refetch: refetch_cnt_PrayList } =
    usePrayList("cnt");
  const { shareLink, isMobile } = useFlutterWebview();
  const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

  const getPrayList = (bool, pray) => {
    // bool이 true일 때 밑에 ,bool이 false이면 위에 pray가 true이면 기도순 클릭
    if (!bool) {
      sortUpPosition(true);
      sortDownPosition(false);
    } else {
      sortUpPosition(false);
      sortDownPosition(true);
    }
  };

  const fetchData = async (top, pray) => {
    pray ? await refetch_cnt_PrayList() : await refetchPrayList();
    getPrayList(top, pray);
    if (top == false && pray == false) {
      setDayToggleTopDay(!dayToggleTopDay);
      setDayToggleTopPrayer(!dayToggleTopPrayer);
      setColorSecondTop("#7BAB6E");
      setColorFirstTop("#EBF6E8");
    } else if (top == false && pray == true) {
      setDayToggleTopPrayer(!dayToggleTopPrayer);
      setDayToggleTopDay(!dayToggleTopDay);
      setColorFirstTop("#7BAB6E");
      setColorSecondTop("#EBF6E8");
    } else if (top == true && pray == false) {
      setDayToggleBottomDay(!dayToggleBottomDay);
      setDayToggleBottomPrayer(!dayToggleBottomPrayer);
      setColorSecondBottom("#7BAB6E");
      setColorFirstBottom("#EBF6E8");
    } else {
      setDayToggleBottomPrayer(!dayToggleBottomPrayer);
      setDayToggleBottomDay(!dayToggleBottomDay);
      setColorFirstBottom("#7BAB6E");
      setColorSecondBottom("#EBF6E8");
    }
  };

  const dayFucTopDay = () => {
    if (!dayToggleTopDay) {
      fetchData(false, false);
    }
  };
  const dayFucTopPrayer = () => {
    if (!dayToggleTopPrayer) {
      fetchData(false, true);
    }
  };

  const dayFucBottomDay = () => {
    if (!dayToggleBottomDay) {
      fetchData(true, false);
    }
  };
  const dayFucBottomPrayer = () => {
    if (!dayToggleBottomPrayer) {
      fetchData(true, true);
    }
  };

  const onShare = async () => {
    setIsShare(!isShare);
    if (isShare) {
      setshareToggle(!shareToggle);
      setIsShare(!isShare);
      const listJoin = Sharelist.join("&share=");
      if (isMobile()) {
        if (/android/i.test(navigator.userAgent)) {
          shareLink({
            title: "Web_share",
            url: `${WEB_ORIGIN}/main?share=` + listJoin,
          });
        } else if (
          /iPad|iPhone|iPod/.test(navigator.userAgent) ||
          navigator.share
        ) {
          navigator.share({
            title: "Web_share",
            url: `${WEB_ORIGIN}/main?share=` + listJoin,
          });
        } else {
          alert("공유하기가 지원되지 않는 환경 입니다.");
        }
      }

      console.log(`${WEB_ORIGIN}/main?share=` + listJoin);
      setShareList([]);
      setPrayerContent((prayerContent) =>
        prayerContent.map((prayerContent) => ({
          ...prayerContent,
          checked: false,
        }))
      );
      setPrayerMoreContent((prayerMoreContent) =>
        prayerMoreContent.map((prayerMoreContent) => ({
          ...prayerMoreContent,
          checked: false,
        }))
      );
    }
  };
  const onCheck = () => {
    setIsShare(!isShare);
    setShareList([]);
    setPrayerContent((prayerContent) =>
      prayerContent.map((prayerContent) => ({
        ...prayerContent,
        checked: false,
      }))
    );
    setPrayerMoreContent((prayerMoreContent) =>
      prayerMoreContent.map((prayerMoreContent) => ({
        ...prayerMoreContent,
        checked: false,
      }))
    );
  };

  return (
    <div>
      <BackgroundBright
        style={{
          zIndex: "103",
          opacity: isModify ? "1" : "0",
          pointerEvents: isModify ? "auto" : "none",
        }}
        onClick={onModify}></BackgroundBright>
      <BackgroundBright
        style={{
          zIndex: "103",
          opacity: isDeleted ? "1" : "0",
          pointerEvents: isDeleted ? "auto" : "none",
        }}
        onClick={onDeleted}></BackgroundBright>
      <BackgroundBright
        style={{
          zIndex: "103",
          opacity: isChecked ? "1" : "0",
          pointerEvents: isChecked ? "auto" : "none",
        }}
        onClick={changeCheck}></BackgroundBright>
      <Background style={{ paddingBottom: padding }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 1, flexGrow: 1, flexBasis: "500px" }}>
            <TopContent>
              <TodayPrayer>기도할게요</TodayPrayer>
              <PrayerSortToggle
                colorFirst={colorFirstTop}
                colorSecond={colorSecondTop}
                dayFucPrayer={dayFucTopPrayer}
                dayFucDay={dayFucTopDay}
              />
            </TopContent>
            <PrayerContentStyle>
              {loading ? (
                <Lottie
                  style={{ scale: "0.5" }}
                  options={defaultOptions}
                  height={300}
                  width={300}
                  isClickToPauseDisabled={true}
                />
              ) : prayerContent.length === 0 ? (
                <EmptySpace color={true} />
              ) : (
                prayerContent.map((content, index) => (
                  <PrayerContent
                    key={index}
                    content={content}
                    dayToggle={dayToggleTopDay}
                    countUpdate={countUpdate}
                    contentClick={contentClick}
                    isShared={isShare}
                    shareList={shareList}
                    clickOff={clickOff}
                    bottom={false}
                  />
                ))
              )}
            </PrayerContentStyle>
          </div>
          <div style={{ flex: 1, flexGrow: 1, flexBasis: "500px" }}>
            <TopContent>
              <TodayPrayer style={{ marginTop: "46px" }}>
                기도했어요
              </TodayPrayer>
              <PrayerSortToggle
                colorFirst={colorFirstBottom}
                colorSecond={colorSecondBottom}
                dayFucPrayer={dayFucBottomPrayer}
                dayFucDay={dayFucBottomDay}
              />
            </TopContent>
            <PrayerContentStyle style={{ background: "#7BAB6E" }}>
              {loading ? (
                <Lottie
                  style={{ scale: "0.5" }}
                  options={defaultOptions}
                  height={300}
                  width={300}
                  isClickToPauseDisabled={true}
                />
              ) : prayerMoreContent.length === 0 ? (
                <EmptySpace color={false} />
              ) : (
                prayerMoreContent.map((content, index) => (
                  <PrayerContent
                    key={index}
                    content={content}
                    dayToggle={dayToggleBottomDay}
                    countUpdate={countUpdate}
                    contentClick={contentClick}
                    isShared={isShare}
                    shareList={shareList}
                    clickOff={clickOff}
                    bottom={true}
                  />
                ))
              )}
            </PrayerContentStyle>
          </div>
        </div>
        <Share
          onShare={onShare}
          onMove={onMove}
          shareToggle={shareToggle}
          onCheck={onCheck}
          isShare={isShare}
          shareLength={shareLength}
          setshareToggle={setshareToggle}
          isModify={isModify}
          isChecked={isChecked}></Share>
        <ToastWrapper>{modalToggle && <Toast>{modalText}</Toast>}</ToastWrapper>
        <BottomMenu
          completeBtnClick={completeBtnClick}
          modifyBtnClick={modifyBtnClick}
          bottom_delete_click={bottom_delete_click}
          clickId={clickId}
          changeCheck={changeCheck}
          isChecked={isChecked}
          clickIsShare={clickIsShare}
        />
        <ModifyBar
          id={clickId}
          valueChange={valueChange}
          onModify={onModify}
          clickData={clickData}
          isModify={isModify}
          updateDate={updateDate}
          setUpdateDate={setUpdateDate}
          dayToggle={dayToggle}
          setDayToggle={setDayToggle}
        />
        <DeleteBar
          deleteBtnClick={deleteBtnClick}
          onDeleted={onDeleted}
          id={clickId}
          isDeleted={isDeleted}
        />
      </Background>
    </div>
  );
}

export default PrayerList;
