import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import Checkbox from "../components/Checkbox/Checkbox";
import { useState } from "react";
import DeleteReasonOptionList from "../components/WithdrawalReason/DeleteReasonOptionList";
import { useDeleteUser } from "../hooks/useDeleteUser";
import Modal from "../components/Modal/Modal";
import BlackScreen from "../components/BlackScreen/BlackScreen";

const initialDeleteReasonOptionList = [
  { id: 1, text: "쓰지 않는 서비스에요.", checked: false },
  { id: 2, text: "원하는 기능이 없어요.", checked: false },
  {
    id: 3,
    text: "오류가 많아서 쓸 수가 없어요.",
    checked: false,
  },
  { id: 4, text: "사용하기에 불편함이 있어요.", checked: false },
  { id: 5, text: "기타", checked: false },
];

const DeleteUser = () => {
  const [deleteReasonOptionList, setDeleteOptionList] = useState(
    initialDeleteReasonOptionList
  );
  const [isAgreementsChecked, setIsAgreementsChecked] = useState(false);
  const [etcReasonInput, setEtcReasonInput] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);

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
    (item) => item.id === 5
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

  // 사유 state를 API 호출을 위한 배열 데이터로 전환 ex) [1, 2, 5]
  const reason_id = deleteReasonOptionList
    .filter((item) => item.checked)
    .map((item) => item.id);
  const reqData = { reason_id, etc: etcReasonInput };

  const { mutate: mutateDeleteUser } = useDeleteUser(reqData);

  const onClickContinueButton = () => {
    if (!isContinueBtnEnabled) return;

    openModal();
  };

  return (
    <S.Root>
      <UserHeader>회원정보 확인</UserHeader>
      <S.Content>
        <S.TopTextsAndOptions>
          <S.TopTexts>
            <S.TopTextCrying>홍길동님... 이대로 이별인가요?</S.TopTextCrying>
            <S.TopTextWondering>
              계정을 삭제하려는 이유가 궁금해요.
            </S.TopTextWondering>
          </S.TopTexts>
          <DeleteReasonOptionList
            toggleOptionById={toggleOptionById}
            deleteReasonOptionList={deleteReasonOptionList}
          />
          {isEtcChecked && (
            <S.EtcReasonInput
              placeholder={
                "계정 삭제 사유에 대해 알려주세요. \n회원님의 소중한 피드백을 통하여 더 나은 서비스로 발전하겠습니다."
              }
              value={etcReasonInput}
              onChange={onChangeEtcReasonInput}
            />
          )}
        </S.TopTextsAndOptions>

        <S.DeleteCautionAndAgreement>
          <S.Caution>
            <S.CautionTitle>계정 삭제 전 주의사항</S.CautionTitle>
            <S.Divider />
            <S.CautionInformation>
              - Uspray 계정 삭제 후 7일간 재가입이 불가능합니다.
            </S.CautionInformation>
            <S.CautionInformation>
              - Uspary 계정 삭제 시 계정의 모든 정보는 삭제되며 재가입 시에도
              복구할 수 없습니다.
            </S.CautionInformation>
          </S.Caution>
          <S.AgreementContainer onClick={toggleAgreementsChecked}>
            <Checkbox
              checked={isAgreementsChecked}
              // 텍스트 영역 클릭시에도 toggle을 실행시키기 위해 보다 상위 컴포넌트에 onClick 지정
              handler={() => {}}
              label={"주의사항을 모두 확인하였으며, 이에 동의합니다."}
              id={"agreement"}
            />
          </S.AgreementContainer>
        </S.DeleteCautionAndAgreement>
      </S.Content>
      <S.ContinueBtn
        isEnabled={isContinueBtnEnabled}
        onClick={onClickContinueButton}>
        계속하기
      </S.ContinueBtn>
      <BlackScreen isModalOn={isModalOn} />
      <Modal
        isModalOn={isModalOn}
        iconSrc={"images/ic_withdrawal.svg"}
        iconAlt={"icon_withdrawal"}
        mainContent={"회원탈퇴 하시겠습니까?"}
        subContent={"신중하게 결정해주세요!"}
        btnContent={"회원탈퇴"}
        btnContent2={"취소"}
        onClickBtn={mutateDeleteUser}
        onClickBtn2={closeModal}
        modalTheme={2}
      />
    </S.Root>
  );
};

export default DeleteUser;

const S = {
  Root: styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
  `,
  Content: styled.div`
    flex: 1;
    margin: 36px 16px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  TopTextsAndOptions: styled.div`
    display: flex;
    flex-direction: column;
  `,
  TopTexts: styled.div``,
  TopTextCrying: styled.div`
    color: var(--color-dark-grey);
    font-family: Noto Sans KR;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  TopTextWondering: styled.div`
    color: var(--color-dark-grey);
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  DeleteCautionAndAgreement: styled.div`
    display: flex;
    flex-direction: column;
    gap: 44px;
  `,
  Caution: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  CautionTitle: styled.div`
    color: var(--color-grey);
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  CautionInformation: styled.div`
    color: var(--color-grey);
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  Divider: styled.div`
    height: 1px;
    background: var(--color-light-grey);
    margin: 12px 0px;
  `,
  AgreementContainer: styled.div`
    display: flex;

    flex-direction: row;
    width: 100%;
  `,
  ContinueBtn: styled.button`
    // remove default button style
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;

    width: 100%;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;

    padding: 20px;

    background-color: ${({ isEnabled }) =>
      isEnabled ? "var(--color-red)" : "var(--color-light-grey)"};
    color: ${({ isEnabled }) =>
      isEnabled ? "var(--color-white)" : "var(--color-grey)"};
  `,
  EtcReasonInput: styled.textarea`
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /* remove the resize handle on the bottom right */

    height: 168px;

    border-radius: 4px;
    border: 1px solid var(--color-light-grey);
    padding: 16px 12px;
  `,
};
