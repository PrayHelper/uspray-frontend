import UserHeader from "../components/UserHeader";
import styled from "styled-components";

const TitleTag = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const PrivacyProcessAgreement = ({ setIsOverlayOn }) => {
  return (
    <>
      <UserHeader overlay={true} setIsOverlayOn={setIsOverlayOn}>
        개인정보 처리 동의서
      </UserHeader>
      <div
        style={{
          width: "100%",
          lineHeight: "23px",
          height: "calc(100vh - 70px)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            color: "#606060",
            marginTop: "16px",
            fontWeight: "400",
            height: "fit-content",
          }}
        >
          Uspray(‘www.uspray.kr“ 이하 '유스프레이' 라고 합니다)은(는)
          개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며 귀하의
          개인정보보호에 최선을 다하고 있습니다. 유스프레이는 개인정보보호법에
          근거하여 다음과 같은 내용으로 개인정보를 수집 및 처리하고자 합니다.
          <br />
          <br />
          다음의 내용을 자세히 읽어보시고 모든 내용을 이해하신 후에 동의 여부를
          결정해주시기 바랍니다.
          <br />
          <TitleTag>제1조(개인정보 수집 및 이용 목적)</TitleTag>
          이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 목적 이외의
          용도로는 사용되지 않습니다.
          <br />- 본인확인 및 서비스 품질 개선
          <TitleTag>제2조(개인정보 수집 및 이용 항목)</TitleTag>
          유스프레이는 개인정보 수집 목적을 위하여 다음과 같은 정보를
          수집합니다.
          <br />- 성명, 전화번호, 성별 및 생년월일
          <TitleTag>제3조 (개인정보 보유 및 이용 기간) </TitleTag>
          1. 수집한 개인정보는 수집•이용 동의일로부터 개인정보 수집·이용 목적을
          달성할 때까지 보관 및 이용합니다. <br />
          2. 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게
          되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          <TitleTag>제4조(동의 거부 관리) </TitleTag>
          귀하는 본 안내에 따른 개인정보 수집·이용에 대하여 동의를 거부할 권리가
          있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에 서비스
          회원가입 제한의 불이익이 발생할 수 있음을 알려드립니다. 본인은 위의
          동의서 내용을 충분히 숙지하였으며, 위와 같이 개인정보를
          수집·이용하는데 동의합니다.
          <div style={{ marginBottom: "37px" }}></div>
        </div>
      </div>
    </>
  );
};

export default PrivacyProcessAgreement;
