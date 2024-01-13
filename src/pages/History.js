import Header from "../components/Header/Header";
import styled from "styled-components";
import HisContent from "../components/History/HisContent";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useFetchHistory } from "../hooks/useFetchHistory";
import { useHistoryModify } from "../hooks/useHistoryModify";
import { useCategory } from "../hooks/useCategory";
import Lottie from "react-lottie";
import LottieData from "../json/lottie.json";
import useToast from "../hooks/useToast";
import PrayDateCategoryInput from "../components/PrayDateCategoryInput/PrayDateCategoryInput";
import PrayDetailModal from "../components/History/PrayDetailModal";

const History = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [currentId, setCurrentId] = useState();
  const [updateDate, setUpdateDate] = useState(null);
  const [updateCategory, setUpdateCategory] = useState(0);
  const [pageMy, setPageMy] = useState(0);
  const [pageShared, setPageShared] = useState(0);
  const [dataMy, setDataMy] = useState([]);
  const [dataShared, setDataShared] = useState([]);
  const [myScrollPos, setMyScrollPos] = useState(0);
  const [sharedScrollPos, setSharedScrollPos] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({});
  const [tab, setTab] = useState("personal");
  const tabType = tab === "personal" ? "personal" : "shared";
  const categoryState = useCategory(tabType);
  const { categoryList, firstCategoryIndex } = categoryState;
  const [deletedItemIds, setDeletedItemIds] = useState([]);

  const { data: myPrayData, refetch: refetchMyData } = useFetchHistory({
    type: "personal",
    page: pageMy,
    size: 15,
  });

  const { data: sharedPrayData, refetch: refetchSharedData } = useFetchHistory({
    type: "shared",
    page: pageShared,
    size: 15,
  });
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
  };

  const onClickSubModal = () => {
    setShowSubModal(!showSubModal);
  };

  const onClickToggle = (e) => {
    tab === "personal"
      ? setMyScrollPos(window.scrollY)
      : setSharedScrollPos(window.scrollY);
    setTab(e.currentTarget.id);
  };

  useEffect(() => {
    // 카테고리가 변경될 때 스크롤 위치 복원
    tab === "personal"
      ? window.scrollTo(0, myScrollPos)
      : window.scrollTo(0, sharedScrollPos);
  }, [tab, myScrollPos, sharedScrollPos]);

  const fetchMyData = async () => {
    const newData = await myPrayData.data.data.historyList;
    const filteredData = newData.filter(
      (newItem) =>
        !dataMy.some(
          (existingItem) => existingItem.historyId === newItem.historyId
        )
    );
    const tmpData = [...dataMy, ...filteredData].filter(
      (item) => !deletedItemIds.some((tmpItem) => tmpItem === item.historyId)
    );
    setDataMy(tmpData);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  const fetchSharedData = async () => {
    const newData = await sharedPrayData.data.data.historyList;
    const filteredData = newData.filter(
      (newItem) =>
        !dataShared.some(
          (existingItem) => existingItem.historyId === newItem.historyId
        )
    );
    const tmpData = [...dataShared, ...filteredData].filter(
      (item) => !deletedItemIds.some((tmpItem) => tmpItem === item.historyId)
    );
    setDataShared(tmpData);
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
        onSuccess: (res) => {
          showToast({});
          setDeletedItemIds((prev) => [...prev, res.data.id]);
          onClickExitModal();
          tab === "personal" ? refetchMyData() : refetchSharedData();
        },
      }
    );
  };

  const onClickHistoryItem = async (e, tab) => {
    setShowModal(true);
    const id = e.currentTarget.id;
    const currentData =
      tab === "personal"
        ? dataMy.find((item) => item.id === Number(id))
        : dataShared.find((item) => item.id === Number(id));
    setCurrentData(currentData);
    setCurrentId(Number(id));
  };

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
        ? setPageMy((prev) => prev + 1)
        : setPageShared((prev) => prev + 1);
    }
  }, [hasMore, inView]);

  return (
    <HistoryWrapper>
      <Header tab={tab} onClickToggle={onClickToggle}>
        히스토리
      </Header>
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
      {!loading && isEmptyData(dataMy) && (
        <NoDataWrapper>
          <NoDataTitle>완료된 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>기간이 지나면 히스토리에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      <div>
        <BlackScreen isModalOn={showModal} />
        {!isEmptyData(dataMy) && showModal && (
          <PrayDetailModal
            showSubModal={showSubModal}
            currentData={currentData}
            onClickSubModal={onClickSubModal}
            onClickExitModal={onClickExitModal}
          />
        )}
        <PrayDateCategoryInput
          categoryList={categoryList}
          showSubModal={showSubModal}
          setShowSubModal={setShowSubModal}
          isDefault={true}
          isShowWordCount={false}
          value=""
          category={firstCategoryIndex}
          setUpdateDate={setUpdateDate}
          setUpdateCategory={setUpdateCategory}
          onClickFunc={() => onClickModify(tab)}
          buttonText="오늘의 기도에 추가"
        />
      </div>
      {tab === "personal" && (
        <div style={{ paddingTop: "115px" }}>
          {/* <div> */}
          {dataMy.map((el) => (
            <div
              onClick={(e) => onClickHistoryItem(e, tab)}
              key={el.historyId}
              id={el.historyId}
            >
              <HisContent
                name={el.name}
                content={el.content}
                date={`${el.createdAt.split("T")[0]} ~ ${el.deadline}`}
              />
              <div ref={ref}></div>
            </div>
          ))}
        </div>
      )}
      {tab === "shared" && (
        <div style={{ paddingTop: "115px" }}>
          {dataShared.map((el) => (
            <div
              onClick={(e) => onClickHistoryItem(e, tab)}
              key={el.historyId}
              id={el.historyId}
            >
              <HisContent
                name={el.name}
                content={el.content}
                date={`${el.createdAt.split("T")[0]} ~ ${el.deadline}`}
              />
              <div ref={ref}></div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "20px", color: `#D0E8CB` }}>.</div>
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
