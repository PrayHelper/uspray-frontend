import Header from "../components/Header/Header";
import styled from "styled-components";
import HisContent from "../components/History/HisContent";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useHistoryList } from "../hooks/useHistoryList";
import { useHistoryModify } from "../hooks/useHistoryModify";
import { useCategory } from "../hooks/useCategory";
import { useHistoryDetail } from "../hooks/useHistoryDetail";
import Lottie from "react-lottie";
import LottieData from "../json/lottie.json";
import useToast from "../hooks/useToast";
import PrayDateCategoryInput from "../components/PrayDateCategoryInput/PrayDateCategoryInput";
import HistoryDetailModal from "../components/History/HistoryDetailModal";
import Overlay from "../components/Overlay/Overlay";
import HistorySearch from "./HistorySearch";
import { useHistory } from "../hooks/useHistory";

const History = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [updateDate, setUpdateDate] = useState(null);
  const [updateCategory, setUpdateCategory] = useState(0);
  const [personalPage, setPersonalPage] = useState(0);
  const [sharedPage, setSharedPage] = useState();
  const [personalHistoryList, setPersonalHistoryList] = useState([]);
  const [sharedHistoryList, setSharedHistoryList] = useState([]);
  const [personalPos, setPersonalPos] = useState(0); // Pos = Position of Scroll (Personal Section)
  const [sharedPos, setSharedPos] = useState(0); // Pos = Position of Scroll (Shared Section)
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({});
  const [tab, setTab] = useState("personal");
  const tabType = tab === "personal" ? "personal" : "shared";
  const categoryState = useCategory(tabType);
  const { categoryList, firstCategoryIndex } = categoryState;
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [isOverlayOn, setIsOverlayOn] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState(firstCategoryIndex);

  const { data: myPrayData, refetch: refetchMyData } = useHistoryList({
    type: "personal",
    page: personalPage,
    size: 15,
  });

  const { data: sharedPrayData, refetch: refetchSharedData } = useHistoryList({
    type: "shared",
    page: sharedPage,
    size: 15,
  });

  const { historyDetail } = useHistoryDetail(selectedHistoryId);
  const { oneMorePray } = useHistory();

  const { showToast } = useToast({
    initialMessage: "기도제목이 오늘의 기도에 추가되었어요.",
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  const onClickExitModal = () => {
    setShowModal(false);
    setShowSubModal(false);
    setSelectedHistoryId(null);
  };

  const onClickSubModal = () => {
    showSubModal ? resetInputData() : setPrayInputValue(historyDetail.content);
    setShowSubModal(!showSubModal);
  };

  const onClickToggle = (e) => {
    tab === "personal"
      ? setPersonalPos(window.scrollY)
      : setSharedPos(window.scrollY);
    setTab(e.currentTarget.id);
  };

  useEffect(() => {
    // 카테고리가 변경될 때 스크롤 위치 복원
    tab === "personal"
      ? window.scrollTo(0, personalPos)
      : window.scrollTo(0, sharedPos);
  }, [tab, personalPos, sharedPos]);

  const fetchMyData = async () => {
    const newData = await myPrayData.data.data.historyList;
    const filteredData = newData.filter(
      (newItem) =>
        !personalHistoryList.some(
          (existingItem) => existingItem.historyId === newItem.historyId
        )
    );
    const tmpData = [...personalHistoryList, ...filteredData].filter(
      (item) => !deletedItemIds.some((tmpItem) => tmpItem === item.historyId)
    );
    setPersonalHistoryList(tmpData);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  const fetchSharedData = async () => {
    const newData = await sharedPrayData.data.data.historyList;
    const filteredData = newData.filter(
      (newItem) =>
        !sharedHistoryList.some(
          (existingItem) => existingItem.historyId === newItem.historyId
        )
    );
    const tmpData = [...sharedHistoryList, ...filteredData].filter(
      (item) => !deletedItemIds.some((tmpItem) => tmpItem === item.historyId)
    );
    setSharedHistoryList(tmpData);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  const { mutate: mutateHistoryModify } = useHistoryModify();

  const onClickModify = (tab) => {
    mutateHistoryModify(
      {
        pray_id: currentId,
        deadline: updateDate,
      },
      {
        onSuccess: () => {
          showToast({});
          onClickExitModal();
          tab === "personal" ? fetchMyData() : fetchSharedData();
        },
      }
    );
  };

  const resetInputData = () => {
    setPrayInputValue("");
    setDateInputValue(null);
    setSelectedCategoryIndex(firstCategoryIndex);
  };

  // 또 기도하기 함수
  const onOneMorePray = async (text, deadline, categoryId) => {
    oneMorePray(
      {
        content: text,
        deadline: deadline,
        categoryId: categoryId,
        historyId: historyDetail.historyId,
      },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setShowModal(false);
          setDeletedItemIds((prev) => [...prev, historyDetail.historyId]);
          tab === "personal" ? refetchMyData() : refetchSharedData();
          resetInputData();
          showToast({});
        },
      }
    );
  };

  useEffect(() => {
    if (selectedHistoryId) {
      setShowModal(true);
    }
  }, [selectedHistoryId]);

  useEffect(() => {}, [deletedItemIds]);

  useEffect(() => {
    if (historyDetail) {
      setShowModal(true);
    }
  }, [historyDetail]);

  useEffect(() => {
    setLoading(true);
    if (myPrayData) {
      fetchMyData();
      setLoading(false);
    }
  }, [myPrayData]);

  useEffect(() => {
    setLoading(true);
    if (sharedPrayData) {
      fetchSharedData();
      setLoading(false);
    }
  }, [sharedPrayData]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      tab === "personal"
        ? setPersonalPage((prev) => prev + 1)
        : setSharedPage((prev) => prev + 1);
    }
  }, [hasMore, inView]);

  return (
    <HistoryWrapper>
      <div style={{ marginBottom: "24px" }}>
        <Header
          tab={tab}
          onClickToggle={onClickToggle}
          setIsOverlayOn={setIsOverlayOn}
        >
          히스토리
        </Header>
      </div>
      {loading && (
        <LottieWrapper>
          <Lottie
            style={{ scale: "0.5", marginTop: "50px" }}
            options={defaultOptions}
            height={300}
            width={300}
            isClickToPauseDisabled={true}
          />
        </LottieWrapper>
      )}
      {!loading && isEmptyData(personalHistoryList) && (
        <NoDataWrapper>
          <NoDataTitle>완료된 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>기간이 지나면 히스토리에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      <div>
        <BlackScreen isModalOn={showModal} />
        {historyDetail && showModal && (
          <HistoryDetailModal
            showSubModal={showSubModal}
            historyDetail={historyDetail}
            onClickSubModal={onClickSubModal}
            onClickExitModal={onClickExitModal}
          />
        )}
        {historyDetail && showSubModal && (
          <PrayDateCategoryInput
            categoryList={categoryList}
            showSubModal={showSubModal}
            setShowSubModal={setShowSubModal}
            inputPlaceHodler={historyDetail.content}
            maxrow={3}
            maxlen={75}
            isShowWordCount={historyDetail.canEdit}
            isDefault={!historyDetail.canEdit}
            setUpdateValue={setPrayInputValue}
            setUpdateDate={setDateInputValue}
            setUpdateCategory={setCategoryInputValue}
            buttonText="오늘의 기도에 추가"
            value={prayInputValue}
            data={historyDetail.deadline}
            category={historyDetail.categoryId}
            onClickFunc={() =>
              onOneMorePray(prayInputValue, dateInputValue, categoryInputValue)
            }
          />
        )}
      </div>
      {tab === "personal" && (
        <div style={{ paddingTop: "115px" }}>
          {personalHistoryList.map((el) => (
            <div
              onClick={() => setSelectedHistoryId(el.historyId)}
              key={el.historyId}
              id={el.historyId}
            >
              <HisContent
                name={el.name}
                content={el.content}
                date={`${el.createdAt
                  .split("T")[0]
                  .replace(/-/g, ".")} ~ ${el.deadline.replace(/-/g, ".")}`}
              />
              <div ref={ref}></div>
            </div>
          ))}
        </div>
      )}
      {tab === "shared" && (
        <div style={{ paddingTop: "115px" }}>
          {sharedHistoryList.map((el) => (
            <div
              onClick={() => setSelectedHistoryId(el.HistoryId)}
              key={el.historyId}
              id={el.historyId}
            >
              <HisContent
                name={el.name}
                content={el.content}
                date={`${el.createdAt
                  .split("T")[0]
                  .replace(/-/g, ".")} ~ ${el.deadline.replace(/-/g, ".")}`}
              />
              <div ref={ref}></div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "20px", color: `#D0E8CB` }}>.</div>
      {isOverlayOn && (
        <Overlay isOverlayOn={isOverlayOn}>
          <HistorySearch
            setIsOverlayOn={setIsOverlayOn}
            ref={ref}
            HisContent={HisContent}
            onClickModify={onClickModify}
            setUpdateCategory={setUpdateCategory}
            setUpdateDate={setUpdateDate}
            firstCategoryIndex={firstCategoryIndex}
            setShowSubModal={setShowModal}
            showSubModal={showSubModal}
            categoryList={categoryList}
            PrayDateCategoryInput={PrayDateCategoryInput}
            onClickExitModal={onClickExitModal}
            onClickSubModal={onClickSubModal}
            HistoryDetailModal={HistoryDetailModal}
            showModal={showModal}
            isEmptyData={isEmptyData}
            NoDataWrapper={NoDataWrapper}
            defaultOptions={defaultOptions}
            Lottie={Lottie}
            LottieWrapper={LottieWrapper}
          />
        </Overlay>
      )}
    </HistoryWrapper>
  );
};

export default History;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  /* padding-top: 65px; */
`;
const LottieWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoDataTitle = styled.div`
  font-weight: 500;
  font-size: 28px;
  color: var(--color-grey);
`;
const NoDataContent = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: var(--color-secondary-grey);
`;
