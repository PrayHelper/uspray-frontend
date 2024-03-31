import styled, { css, keyframes } from "styled-components";
import DeleteReasonOptionList from "../WithdrawalReason/DeleteReasonOptionList";
import UserHeader from "../UserHeader";
import BlackScreen from "../BlackScreen";
import Modal from "../Modal/Modal";
import Checkbox from "../Checkbox/Checkbox";
import { useUserName } from "../../hooks/useUserName";

const DeleteUserInProgressView = ({
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
}) => {
  const { userName } = useUserName();

  return (
    <S.Root>
      <UserHeader back={() => setShowDeleteUser(false)}>계정 삭제</UserHeader>
      <S.Content>
        <S.TopTextsAndOptions>
          <S.TopTexts>
            <S.TopTextCrying>
              {userName}님... 이대로 이별인가요?
            </S.TopTextCrying>
            <S.TopTextWondering>
              계정을 삭제하려는 이유가 궁금해요.
            </S.TopTextWondering>
          </S.TopTexts>
          <DeleteReasonOptionList
            toggleOptionById={toggleOptionById}
            deleteReasonOptionList={deleteReasonOptionList}
          />
          <S.EtcReasonInput
            placeholder={
              "계정 삭제 사유에 대해 알려주세요. \n회원님의 소중한 피드백을 통하여 더 나은 서비스로 발전하겠습니다."
            }
            isEtcChecked={isEtcChecked}
            value={etcReasonInput}
            onChange={onChangeEtcReasonInput}
          />
        </S.TopTextsAndOptions>

        <S.DeleteCautionAndAgreement>
          <S.Caution>
            <S.CautionTitle>계정 삭제 전 주의사항</S.CautionTitle>
            <S.Divider />
            <S.CautionInformation>
              - Uspray 계정 삭제 후 7일간 재가입이 불가능합니다.
            </S.CautionInformation>
            <S.CautionInformation>
              - Uspray 계정 삭제 시 계정의 모든 정보는 삭제되며 재가입 시에도
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
      <S.BottomButton
        isEnabled={isContinueBtnEnabled}
        onClick={onClickContinueButton}
      >
        계속하기
      </S.BottomButton>
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

export default DeleteUserInProgressView;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;
const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

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
    font-size: 24px;
    font-weight: 500;
  `,
  TopTextWondering: styled.div`
    color: var(--color-dark-grey);
  `,
  DeleteCautionAndAgreement: styled.div`
    display: flex;
    flex-direction: column;
    gap: 44px;
    margin-top: 20px;
  `,
  Caution: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  CautionTitle: styled.div`
    color: var(--color-grey);
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  `,
  CautionInformation: styled.div`
    color: var(--color-grey);
    font-size: 14px;
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
  BottomButton: styled.button`
    // remove default button style
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;

    width: 100%;
    font-weight: 500;
    line-height: 23px;
    text-align: center;
    padding: 20px;
    transition: all 0.3s ease-in-out;

    background-color: ${({ isEnabled }) =>
      isEnabled ? css`var(--color-red)` : css`var(--color-light-grey)`};
    color: ${({ isEnabled }) =>
      isEnabled ? css`var(--color-white)` : css`var(--color-grey)`};
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

    transition: visibility 0.5s ease;

    opacity: ${(props) => (props.isEtcChecked ? "1" : "0")};

    animation: ${(props) =>
      props.isEtcChecked
        ? css`
            ${fadeIn} 0.5s ease
          `
        : css`
            ${fadeOut} 0.5s ease
          `};
  `,
};
