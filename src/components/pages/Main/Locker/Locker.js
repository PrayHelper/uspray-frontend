// // Deprecated(4/26)

// import React, { useEffect, useState } from "react";
// import S from "./Locker.style";
// import LockerContent from "../../../Locker/LockerContent";
// import { ToastTheme } from "../../../Toast/Toast";
// import { useDeleteSharedList } from "../../../../hooks/useDeleteSharedList";
// import { useFetchSharedList } from "../../../../hooks/useFetchSharedList";
// import { useUpdateSharedList } from "../../../../hooks/useUpdateSharedList";
// import Lottie from "react-lottie";
// import LottieData from "../../../../json/lottie.json";
// import useToast from "../../../../hooks/useToast";
// import BlackScreen from "../../../BlackScreen";
// import Modal from "../../../Modal/Modal";
// import { useCategory } from "../../../../hooks/useCategory";
// import PrayDateCategoryInput from "../../../PrayDateCategoryInput/PrayDateCategoryInput";
// import LockerHeader from "../../../Locker/LockerHeader";

// const Locker = ({ goBack, refetchPrayList }) => {
//   const [data, setData] = useState([]);
//   const { categoryList, firstCategoryIndex } = useCategory("shared");
//   const [isLoading, setIsLoading] = useState(true);
//   // 기도제목 목록 선택 여부 ex) [true, true, false]
//   const [isClicked, setIsClicked] = useState([]);
//   // 선택되어 있는 sharedPrayId 배열
//   const [selectedIds, setSelectedIds] = useState([]);
//   // 중복 저장 방지용 (API 통신 중인지 여부)
//   const [saving, setSaving] = useState(false);
//   // 기도제목 저장할 때 PrayDateCategoryInput 컴포넌트에서 사용되는 변수들
//   const [showModal, setShowModal] = useState(false);
//   const [showSubModal, setShowSubModal] = useState(false);
//   const [dateInputValue, setDateInputValue] = useState(null);
//   const [categoryInputValue, setCategoryInputValue] = useState(0);

//   const { showToast } = useToast({});

//   const defaultOptions = {
//     //예제1
//     loop: true,
//     autoplay: true,
//     animationData: LottieData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   // DDay 계산
//   const calculateDday = (startDate) => {
//     const start = new Date(startDate);
//     const today = new Date();
//     const oneDay = 24 * 60 * 60 * 1000;
//     if (start < today) {
//       const diffInMilliseconds = today - start;
//       const daysDiff = Math.floor(diffInMilliseconds / oneDay);
//       return daysDiff;
//     }
//     return 0;
//   };

//   // 데이터 저장 확인
//   const isEmptyData = (data) => {
//     return data.length === 0 ? true : false;
//   };

//   // 전체 선택 및 해제 구현
//   const onClickSelectAll = () => {
//     if (isClicked.some((clicked) => clicked)) {
//       setIsClicked(isClicked.map(() => false));
//       setSelectedIds([]);
//     } else {
//       setIsClicked(isClicked.map(() => true));
//       const allPrayIds = data.map((item) => item.sharedPrayId);
//       setSelectedIds(allPrayIds);
//     }
//   };

//   // 배열 요소 선택
//   const onClickContent = (index, prayId) => {
//     const updateClickedId = prayId;
//     // 이미 선택된 prayId인지 확인
//     const isSelected = selectedIds.includes(updateClickedId);
//     if (isSelected) {
//       // 이미 선택된 경우 해당 prayId를 제거
//       const updatedSelectedIds = selectedIds.filter(
//         (id) => id !== updateClickedId
//       );
//       setSelectedIds(updatedSelectedIds);
//     } else {
//       // 선택되지 않은 경우 해당 prayId를 추가
//       setSelectedIds([...selectedIds, updateClickedId]);
//     }

//     const updateClickedList = [...isClicked];
//     updateClickedList[index] = !updateClickedList[index];
//     setIsClicked(updateClickedList);
//   };

//   const onClickSave = () => {
//     if (categoryList.length === 0) {
//       setShowModal(true);
//     } else {
//       setShowSubModal(true);
//     }
//   };

//   // 공유 리스트 읽기
//   const { sharedListData, refetchSharedListData } = useFetchSharedList();

//   const fetchSharedList = () => {
//     setData(sharedListData);
//     setIsClicked(new Array(sharedListData.length).fill(false));
//     console.log(sharedListData);
//     console.log("리스트 읽기");
//   };

//   const { mutateAsync: deleteListData } = useDeleteSharedList();

//   const deleteSharedList = () => {
//     let prayIdList = []; // 빈 배열을 초기화하여 prayIdList를 설정합니다.
//     if (isClicked.every((clicked) => clicked)) {
//       // 모든 항목이 선택된 경우 모든 prayId를 배열에 추가합니다.
//       prayIdList = data.map((item) => item.sharedPrayId);
//       console.log("전체선택");
//     } else {
//       // 선택된 항목만 배열에 추가합니다.
//       prayIdList = selectedIds;
//     }

//     deleteListData(
//       {
//         sharedPrayIds: prayIdList,
//       },
//       {
//         onSuccess: () => {
//           showToast({
//             message: "기도제목이 삭제되었습니다.",
//             theme: ToastTheme.SUCCESS,
//           });
//           refetchSharedListData();
//           setSelectedIds([]);
//         },
//       }
//     );
//   };

//   const { mutate: updateListData } = useUpdateSharedList();

//   const saveSharedList = (dateInputValue, categoryInputValue) => {
//     if (!saving) {
//       let prayIdList = []; // 빈 배열을 초기화하여 prayIdList를 설정합니다.

//       if (isClicked.every((clicked) => clicked)) {
//         // 모든 항목이 선택된 경우 모든 prayId를 배열에 추가합니다.
//         prayIdList = data.map((item) => item.sharedPrayId);
//         console.log("전체선택");
//       } else {
//         // 선택된 항목만 배열에 추가합니다.
//         prayIdList = selectedIds;
//       }
//       setSaving(true);
//       updateListData(
//         {
//           sharedPrayIds: prayIdList,
//           deadline: dateInputValue,
//           categoryId: categoryInputValue,
//         },
//         {
//           onSuccess: () => {
//             showToast({
//               message: "기도제목이 저장되었습니다.",
//               theme: ToastTheme.SUCCESS,
//             });
//             refetchPrayList();
//             setDateInputValue(null);
//             refetchSharedListData();
//             setSelectedIds([]);
//             setShowSubModal(false);
//             setSaving(false);
//           },
//           onError: (e) => {
//             console.log(e);
//             setSaving(false);
//           },
//         }
//       );
//     }
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     if (sharedListData) {
//       fetchSharedList();
//       setIsLoading(false);
//     }
//   }, [sharedListData, setIsLoading]);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <S.LockerWrapper>
//       <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
//       <Modal
//         isModalOn={showModal}
//         iconSrc={"images/icon_notice.svg"}
//         iconAlt={"icon_notice"}
//         mainContent={"카테고리를 먼저 추가해주세요!"}
//         subContent={"메인 화면에서 생성할 수 있습니다."}
//         btnContent={"네, 그렇게 할게요."}
//         onClickBtn={handleCloseModal}
//       />
//       <LockerHeader
//         isEmptyData={isEmptyData(data)}
//         isClicked={isClicked.some((clicked) => clicked)}
//         onClickSelectAll={onClickSelectAll}
//         deleteSharedList={deleteSharedList}
//         onClickSave={onClickSave}
//       />
//       {isLoading && (
//         <S.LottieWrapper>
//           <Lottie
//             style={{ scale: "0.5" }}
//             options={defaultOptions}
//             height={300}
//             width={300}
//             isClickToPauseDisabled={true}
//           />
//         </S.LottieWrapper>
//       )}
//       {!isLoading && isEmptyData(data) && (
//         <S.NoDataWrapper>
//           <S.NoDataTitle>공유받은 기도제목이 없네요.</S.NoDataTitle>
//           <S.NoDataContent>공유받으면 보관함에 저장됩니다!</S.NoDataContent>
//         </S.NoDataWrapper>
//       )}
//       {!isLoading && !isEmptyData(data) && (
//         <S.LockerList>
//           <div style={{ paddingTop: "65px", width: "100%" }}>
//             {data.map((item, index) => (
//               <div onClick={() => onClickContent(index, item.sharedPrayId)}>
//                 <LockerContent
//                   isClicked={isClicked[index]}
//                   title={item.content}
//                   target={item.name}
//                   dday={calculateDday(item.createdAt)}
//                   key={item.prayId}
//                 />
//               </div>
//             ))}
//           </div>
//         </S.LockerList>
//       )}
//       {showSubModal && (
//         <PrayDateCategoryInput
//           categoryList={categoryList}
//           showSubModal={showSubModal}
//           setShowSubModal={setShowSubModal}
//           isShowWordCount={false}
//           isDefault={true}
//           setUpdateDate={setDateInputValue}
//           setUpdateCategory={setCategoryInputValue}
//           buttonText="내 기도수첩에 저장하기"
//           category={firstCategoryIndex}
//           onClickFunc={() => saveSharedList(dateInputValue, categoryInputValue)}
//           lockerCount={selectedIds.length}
//         />
//       )}
//       <S.BottomButton onClick={goBack}>뒤로 가기</S.BottomButton>
//     </S.LockerWrapper>
//   );
// };

// export default Locker;
