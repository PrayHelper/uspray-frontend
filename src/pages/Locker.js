import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LockerContent from "../components/Locker/LockerContent";
import LockerHeader from "../components/Locker/L_Header";
import { ToastTheme } from "../components/Toast/Toast";
import { useDeleteSharedList } from "../hooks/useDeleteSharedList";
import { useFetchSharedList } from "../hooks/useFetchSharedList";
import { useUpdateSharedList } from "../hooks/useUpdateSharedList";
import Lottie from "react-lottie";
import LottieData from "../json/lottie.json";
import useToast from "../hooks/useToast";
import BlackScreen from "../components/BlackScreen";
import Modal from "../components/Modal/Modal";
import { useCategory } from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import PrayDateCategoryInput from "../components/PrayDateCategoryInput/PrayDateCategoryInput";

const Locker = ({ setIsOverlayOn, refetchPrayList }) => {
  const [data, setData] = useState([]);
  const { categoryList, firstCategoryIndex } = useCategory("shared");
  const [isClicked, setIsClicked] = useState([]);
  // 선택되어 있는 ID 배열
  const [selectedID, setSelectedID] = useState([]);
  // 기도제목 목록 선택 여부 ex) [true, true, false]
  const [isLoading, setIsLoading] = useState(true);
  // 중복 저장 방지용 (API 통신 중인지 여부)
  const [saving, setSaving] = useState(false);
  // 기도제목 저장할 때 PrayDateCategoryInput 컴포넌트에서 사용되는 변수들
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);

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
    const oneDay = 24 * 60 * 60 * 1000;
    if (start < today) {
      const diffInMilliseconds = today - start;
      const daysDiff = Math.floor(diffInMilliseconds / oneDay);
      return daysDiff;
    }
    return 0;
  };

  // 데이터 저장 확인
  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  // 전체 선택 및 해제 구현
  const onClickSelectAll = () => {
    if (isClicked.some((clicked) => clicked)) {
      setIsClicked(isClicked.map(() => false));
      setSelectedID([]);
    } else {
      setIsClicked(isClicked.map(() => true));
      const allPrayIds = data.map((item) => item.sharedPrayId);
      setSelectedID(allPrayIds);
    }
  };

  // 배열 요소 선택
  const onClickContent = (index, prayId) => {
    const updateClickedID = prayId;
    // 이미 선택된 prayId인지 확인
    const isSelected = selectedID.includes(updateClickedID);
    if (isSelected) {
      // 이미 선택된 경우 해당 prayId를 제거
      const updatedSelectedID = selectedID.filter(
        (id) => id !== updateClickedID
      );
      setSelectedID(updatedSelectedID);
    } else {
      // 선택되지 않은 경우 해당 prayId를 추가
      setSelectedID([...selectedID, updateClickedID]);
    }

    const updateClickedList = [...isClicked];
    updateClickedList[index] = !updateClickedList[index];
    setIsClicked(updateClickedList);
  };

  const onClickSave = () => {
    if (categoryList.length === 0) {
      setShowModal(true);
    } else {
      setShowSubModal(true);
    }
  };

  // 공유 리스트 읽기
  const { sharedListData, refetchSharedListData } = useFetchSharedList();

  const fetchSharedList = () => {
    setData(sharedListData);
    setIsClicked(new Array(sharedListData.length).fill(false));
    console.log(sharedListData);
    console.log("리스트 읽기");
  };

  const { mutateAsync: deleteListData } = useDeleteSharedList();

  const deleteSharedList = () => {
    let prayIdList = []; // 빈 배열을 초기화하여 prayIdList를 설정합니다.
    if (isClicked.every((clicked) => clicked)) {
      // 모든 항목이 선택된 경우 모든 prayId를 배열에 추가합니다.
      prayIdList = data.map((item) => item.sharedPrayId);
      console.log("전체선택");
    } else {
      // 선택된 항목만 배열에 추가합니다.
      prayIdList = selectedID;
    }

    deleteListData(
      {
        sharedPrayIds: prayIdList,
      },
      {
        onSuccess: () => {
          showToast({
            message: "기도제목이 삭제되었습니다.",
            theme: ToastTheme.SUCCESS,
          });
          refetchSharedListData();
          setSelectedID([]);
        },
      }
    );
  };

  const { mutate: updateListData } = useUpdateSharedList();

  const saveSharedList = (dateInputValue, categoryInputValue) => {
    if (!saving) {
      let prayIdList = []; // 빈 배열을 초기화하여 prayIdList를 설정합니다.

      if (isClicked.every((clicked) => clicked)) {
        // 모든 항목이 선택된 경우 모든 prayId를 배열에 추가합니다.
        prayIdList = data.map((item) => item.sharedPrayId);
        console.log("전체선택");
      } else {
        // 선택된 항목만 배열에 추가합니다.
        prayIdList = selectedID;
      }
      setSaving(true);
      updateListData(
        {
          sharedPrayIds: prayIdList,
          deadline: dateInputValue,
          categoryId: categoryInputValue,
        },
        {
          onSuccess: () => {
            showToast({
              message: "기도제목이 저장되었습니다.",
              theme: ToastTheme.SUCCESS,
            });
            refetchPrayList();
            setDateInputValue(null);
            refetchSharedListData();
            setSelectedID([]);
            setShowSubModal(false);
            setSaving(false);
          },
          onError: (e) => {
            console.log(e);
            setSaving(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (sharedListData) {
      fetchSharedList();
      setIsLoading(false);
    }
  }, [sharedListData]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <LockerWrapper>
      <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
      <Modal
        isModalOn={showModal}
        iconSrc={"images/icon_notice.svg"}
        iconAlt={"icon_notice"}
        mainContent={"카테고리를 먼저 추가해주세요!"}
        subContent={"메인 화면에서 생성할 수 있습니다."}
        btnContent={"네, 그렇게 할게요."}
        onClickBtn={handleCloseModal}
      />
      <LockerHeader
        isEmptyData={isEmptyData(data)}
        isClicked={isClicked.some((clicked) => clicked)}
        onClickSelectAll={onClickSelectAll}
        deleteSharedList={deleteSharedList}
        onClickSave={onClickSave}
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
              <div onClick={() => onClickContent(index, item.sharedPrayId)}>
                <LockerContent
                  isClicked={isClicked[index]}
                  title={item.content}
                  target={item.name}
                  dday={calculateDday(item.createdAt)}
                  key={item.prayId}
                />
              </div>
            ))}
          </div>
        </LockerList>
      )}
      {showSubModal && (
        <PrayDateCategoryInput
          categoryList={categoryList}
          showSubModal={showSubModal}
          setShowSubModal={setShowSubModal}
          isShowWordCount={false}
          isDefault={true}
          setUpdateDate={setDateInputValue}
          setUpdateCategory={setCategoryInputValue}
          buttonText="내 기도수첩에 저장하기"
          category={firstCategoryIndex}
          onClickFunc={() => saveSharedList(dateInputValue, categoryInputValue)}
          lockerCount={selectedID.length}
        />
      )}
      <BottomButton onClick={() => setIsOverlayOn(false)}>
        뒤로 가기
      </BottomButton>
    </LockerWrapper>
  );
};

export default Locker;

const LockerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: var(--color-light-green);
  justify-content: flex-end;
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

const BottomButton = styled.div`
  border: none;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
  cursor: pointer;
  width: 100%
  font-weight: 500;
  text-align: center;
  padding: 20px 0px;
  background-color: var(--color-dark-green);
  color: var(--color-white);
`;
