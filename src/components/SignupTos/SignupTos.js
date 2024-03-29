import styled from "styled-components";
import Checkbox from "../Checkbox/Checkbox";
import ToS from "../../pages/ToS";
import PrivacyProcessAgreement from "../../pages/PrivacyProcessAgreement";
import { useState } from "react";
import Overlay from "../Overlay/Overlay";

/** 상위 컴포넌트에서 useSignupTos와 함께 불러와 사용 */
const SignupTos = ({ isAgreed, toggleHandler, isAgreedAll, toggleAll }) => {
  const [isOverlayOn, setIsOverlayOn] = useState(false);
  const [information, setInformation] = useState(null);

  function showInformation(page) {
    setInformation(page);
    setIsOverlayOn(true);
  }

  return (
    <S.Root>
      <Checkbox
        label={"모두 동의하기"}
        checked={isAgreedAll}
        handler={toggleAll}
      />
      <S.DividerContainer>
        <S.DividerLine />
      </S.DividerContainer>
      <Checkbox
        id="tos1"
        label={"만 14세 이상입니다."}
        checked={isAgreed["tos1"]}
        handler={toggleHandler}
      />
      <Checkbox
        id="tos2"
        label={"에 동의합니다."}
        linklabel={"서비스 이용약관"}
        checked={isAgreed["tos2"]}
        handler={toggleHandler}
        showInformation={() =>
          showInformation(<ToS setIsOverlayOn={setIsOverlayOn} />)
        }
      />
      <Checkbox
        id="tos3"
        label={"에 동의합니다."}
        linklabel={"개인정보 수집 및 이용"}
        checked={isAgreed["tos3"]}
        handler={toggleHandler}
        showInformation={() =>
          showInformation(
            <PrivacyProcessAgreement setIsOverlayOn={setIsOverlayOn} />
          )
        }
      />
      {isOverlayOn && (
        <Overlay isOverlayOn={isOverlayOn}>{information}</Overlay>
      )}
    </S.Root>
  );
};

export default SignupTos;

const S = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  AgreeAllArea: styled.div``,
  DividerContainer: styled.div`
    padding: 4px 0;
  `,
  DividerLine: styled.div`
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  `,
  AgreementItemsArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
};
