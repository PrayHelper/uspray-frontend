import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LockerContent from "../components/Locker/LockerContent";
import LockerHeader from "../components/Locker/L_Header";
import { ToastTheme } from "../components/Toast/Toast";
import { useDeleteSharedList } from "../hooks/useDeleteSharedList";
import { useFetchSharedList } from "../hooks/useFetchSharedList";
import { useUpdateSharedList } from "../hooks/useUpdateSharedList";
import Lottie from "react-lottie";
import LottieData from "../components/Main/json/uspray.json";
import useToast from "../hooks/useToast";

const Locker = () => {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast({});

  const defaultOptions = {
    //예제1
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // DDay 계산
  const calculateDday = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const diffInMilliseconds = today - start;
    return Math.floor(diffInMilliseconds / millisecondsPerDay);
  };

  // 데이터 저장 확인
  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  // 전체 선택 및 해제 구현
  const onClickSelectAll = () => {
    if (isClicked.some((clicked) => clicked)) {
      setIsClicked(isClicked.map(() => false));
    } else {
      setIsClicked(isClicked.map(() => true));
    }
  };

  // 배열 요소 선택
  const onClickContent = (index, pray_id) => {
    console.log(pray_id);
    console.log(index);
    const updateClickedID = pray_id;
    // 이미 선택된 pray_id인지 확인
    const isSelected = selectedID.includes(updateClickedID);
    if (isSelected) {
      // 이미 선택된 경우 해당 pray_id를 제거
      const updatedSelectedID = selectedID.filter(
        (id) => id !== updateClickedID
      );
      setSelectedID(updatedSelectedID);
    } else {
      // 선택되지 않은 경우 해당 pray_id를 추가
      setSelectedID([...selectedID, updateClickedID]);
    }

    const updateClickedList = [...isClicked];
    updateClickedList[index] = !updateClickedList[index];
    setIsClicked(updateClickedList);
  };

  // 공유 리스트 읽기
  const { data: sharedListData, refetch: refetchSharedListData } =
    useFetchSharedList();

  const fetchSharedList = () => {
    setData(sharedListData.data);
    setIsClicked(new Array(sharedListData.data.length).fill(false));
    console.log(sharedListData);
    console.log("리스트 읽기");
  };

  const { mutateAsync: deleteListData } = useDeleteSharedList();

  const deleteSharedList = () => {
    let pray_id_list = []; // 빈 배열을 초기화하여 pray_id_list를 설정합니다.

    if (isClicked.every((clicked) => clicked)) {
      // 모든 항목이 선택된 경우 모든 pray_id를 배열에 추가합니다.
      pray_id_list = data.map((item) => item.pray_id);
      console.log("전체선택");
    } else {
      // 선택된 항목만 배열에 추가합니다.
      pray_id_list = selectedID;
    }

    deleteListData(
      {
        pray_id_list: pray_id_list,
      },
      {
        onSuccess: () => {
          showToast({
            message: "기도제목이 삭제되었습니다.",
            theme: ToastTheme.SUCCESS,
          });
          refetchSharedListData();
        },
      }
    );
  };

  const { mutate: updateListData } = useUpdateSharedList();

  const saveSharedList = () => {
    let pray_id_list = []; // 빈 배열을 초기화하여 pray_id_list를 설정합니다.

    if (isClicked.every((clicked) => clicked)) {
      // 모든 항목이 선택된 경우 모든 pray_id를 배열에 추가합니다.
      pray_id_list = data.map((item) => item.pray_id);
      console.log("전체선택");
    } else {
      // 선택된 항목만 배열에 추가합니다.
      pray_id_list = selectedID;
    }

    updateListData(
      {
        pray_id_list: pray_id_list,
      },
      {
        onSuccess: () => {
          showToast({
            message: "기도제목이 저장되었습니다.",
            theme: ToastTheme.SUCCESS,
          });
          refetchSharedListData();
        },
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    if (sharedListData) {
      fetchSharedList();
      setIsLoading(false);
    }
  }, [sharedListData]);
  // useEffect(() => {
  //   if (sharedListData) {
  //     fetchSharedList();
  //   }
  // }, [sharedListData]);

  return (
    <LockerWrapper>
      <LockerHeader
        isEmptyData={isEmptyData(data)}
        isClicked={isClicked.some((clicked) => clicked)}
        onClickSelectAll={onClickSelectAll}
        deleteSharedList={deleteSharedList}
        saveSharedList={saveSharedList}
      />
      {isLoading && (
        <LottieWrapper>
          <Lottie
            style={{ scale: "0.5" }}
            options={defaultOptions}
            height={300}
            width={300}
            isClickToPauseDisabled={true}
          />
        </LottieWrapper>
      )}
      {!isLoading && isEmptyData(data) && (
        <NoDataWrapper>
          <NoDataTitle>공유받은 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>공유받으면 보관함에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      {!isLoading && !isEmptyData(data) && (
        <LockerList>
          <div style={{ paddingTop: "65px", width: "100%" }}>
            {data.map((item, index) => (
              <div
                // style={{ width: "100%" }}
                onClick={() => onClickContent(index, item.pray_id)}
              >
                <LockerContent
                  isClicked={isClicked[index]}
                  name={item.share_name}
                  title={item.title}
                  target={item.target}
                  dday={calculateDday(item.shared_at)}
                  key={item.pray_id}
                />
              </div>
            ))}
          </div>
        </LockerList>
      )}
      <div style={{ marginTop: "20px", color: "var(--color-white)" }}>.</div>
    </LockerWrapper>
  );
};

export default Locker;

const LockerWrapper = styled.div`
  /* padding-top: 65px; */
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: var(--color-light-green);
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
  font-weight: 700;
  font-size: 28px;
  line-height: 41px;
  color: var(--color-dark-green);
`;
const NoDataContent = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--color-secondary-green);
`;

const LockerList = styled.div`
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
`;
