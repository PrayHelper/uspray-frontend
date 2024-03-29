import { useState } from "react";
import { useDeleteUser } from "../hooks/useDeleteUser";
import DeleteUserInProgressView from "../components/DeleteUser/DeleteUserInProgressView";
import DeleteUserFinishedView from "../components/DeleteUser/DeleteUserFinishedView";

const initialDeleteReasonOptionList = [
  { id: "DONT_NEED", text: "쓰지 않는 서비스에요.", checked: false },
  { id: "NOT_USABLE", text: "원하는 기능이 없어요.", checked: false },
  {
    id: "MANY_ERROR",
    text: "오류가 많아서 쓸 수가 없어요.",
    checked: false,
  },
  { id: "USE_DIFFICULT", text: "사용하기에 불편함이 있어요.", checked: false },
  { id: "ETC", text: "기타", checked: false },
];

const DeleteUser = ({setShowDeleteUser}) => {
  const [isFinished, setIsFinished] = useState(false);
  const [deleteReasonOptionList, setDeleteOptionList] = useState(
    initialDeleteReasonOptionList
  );
  const [isAgreementsChecked, setIsAgreementsChecked] = useState(false);
  const [etcReasonInput, setEtcReasonInput] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);

  // 사유 state를 API 호출을 위한 배열 데이터로 전환 ex) ["DONT_NEED", "USE_DIFFICULT"]
  const withdrawReason = deleteReasonOptionList
    .filter((item) => item.checked)
    .map((item) => item.id);
  const reqData = { withdrawReason, description: etcReasonInput };
  const { mutate: mutateDeleteUser } = useDeleteUser({
    reqData,
    onSuccess: () => {
      setIsFinished(true);
    },
  });

  const openModal = () => {
    setIsModalOn(true);
  };
  const closeModal = () => {
    setIsModalOn(false);
  };

  // 약관동의 + 사유 중 하나 이상 체크
  const isContinueBtnEnabled =
    isAgreementsChecked && deleteReasonOptionList.some((item) => item.checked);

  const isEtcChecked = deleteReasonOptionList.find(
    (item) => item.id === "ETC"
  ).checked;

  const toggleOptionById = (id) => {
    setDeleteOptionList(
      deleteReasonOptionList.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const toggleAgreementsChecked = () => {
    setIsAgreementsChecked((prev) => !prev);
  };

  const onChangeEtcReasonInput = (e) => {
    setEtcReasonInput(e.target.value);
  };

  const onClickContinueButton = () => {
    if (!isContinueBtnEnabled) return;

    openModal();
  };

  if (isFinished) return <DeleteUserFinishedView />;

  return (
    <DeleteUserInProgressView
      {...{
        isEtcChecked,
        toggleOptionById,
        deleteReasonOptionList,
        etcReasonInput,
        onChangeEtcReasonInput,
        toggleAgreementsChecked,
        isAgreementsChecked,
        isContinueBtnEnabled,
        onClickContinueButton,
        isModalOn,
        mutateDeleteUser,
        closeModal,
        setShowDeleteUser,
      }}
    />
  );
};

export default DeleteUser;
