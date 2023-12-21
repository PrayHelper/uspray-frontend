import UserHeader from "../components/UserHeader";
import styled from "styled-components";

const TitleTag = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ToS = ({ setIsOverlayOn }) => {
  return (
    <>
      <UserHeader overlay={true} setIsOverlayOn={setIsOverlayOn} fixed={true}>
        이용 약관 및 정책
      </UserHeader>
      <div
        style={{
          width: "100%",
          marginTop: "28px",
          lineHeight: "23px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            color: "#606060",
            marginTop: "90px",
          }}
        >
          <TitleTag style={{ marginTop: "-16px" }}>제1조(목적) </TitleTag>이
          약관은 Uspray(‘www.uspray.kr“ 이하 '유스프레이' 라고 합니다)가
          제공하는 제반 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및
          책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          <TitleTag>제2조(정의)</TitleTag>이 약관에서 사용하는 주요 용어의
          정의는 다음과 같습니다. <br />
          1. '서비스'라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종
          유무선 장치를 포함)와 상관없이 '이용자'가 이용할 수 있는 유스프레이가
          제공하는 제반 서비스를 의미합니다. <br />
          2. '이용자'란 이 약관에 따라 유스프레이가 제공하는 서비스를 받는
          '개인회원', '기업회원' 및 '비회원'을 말합니다. <br />
          3. '개인회원'은 유스프레이에 개인정보를 제공하여 회원등록을 한
          사람으로, 유스프레이로부터 지속적으로 정보를 제공받고 '유스프레이'가
          제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다. <br />
          4. '기업회원'은 유스프레이에 기업정보 및 개인정보를 제공하여
          회원등록을 한 사람으로, 유스프레이로부터 지속적으로 정보를 제공받고
          유스프레이가 제공하는 서비스를 계속적으로 이용할 수 있는 자를
          말합니다. <br />
          5. '비회원'은 회원가입 없이 유스프레이가 제공하는 서비스를 이용하는
          자를 말합니다.
          <br />
          6. '아이디(ID)'라 함은 회원의 식별과 서비스이용을 위하여 회원이 정하고
          유스프레이가 승인하는 문자 또는 문자와 숫자의 조합을 의미합니다.{" "}
          <br />
          7. '비밀번호'라 함은 회원이 부여받은 아이디와 일치되는 회원임을
          확인하고 비밀의 보호를 위해 회원 자신이 정한 문자(특수문자 포함)와
          숫자의 조합을 의미합니다. <br />
          8. '유료서비스'라 함은 유스프레이가 유료로 제공하는 제반 서비스를
          의미합니다. <br />
          9. '결제'란 유스프레이가 제공하는 유료서비스를 이용하기 위하여 회원이
          지불수단을 선택하고, 금융정보를 입력하는 행위를 말합니다. <br />
          10. '인앱결제'(은)는 유스프레이가 제공하는 유료서비스를 이용하기 위해
          구매하는 인터넷 상의 결제수단으로, 회원의 아이디(ID)를 기준으로 충전,
          결제, 환불 등이 가능합니다. <br />
          11. '콘텐츠'란 정보통신망법의 규정에 따라 정보통신망에서 사용되는
          부호·문자·음성·음향·이미지 또는 영상 등으로 정보 형태의 글, 사진,
          동영상 및 각종 파일과 링크 등을 말합니다.
          <TitleTag>제3조(약관 외 준칙) </TitleTag>이 약관에서 정하지 아니한
          사항에 대해서는 법령 또는 유스프레이가 정한 서비스의 개별약관,
          운영정책 및 규칙 등(이하 세부지침)의 규정에 따릅니다. 또한 본 약관과
          세부지침이 충돌할 경우에는 세부지침에 따릅니다.
          <TitleTag>제4조(약관의 효력과 변경) </TitleTag>
          1. 이 약관은 Uspray(이)가 제공하는 모든 인터넷서비스에 게시하여
          공시합니다. 유스프레이는 '전자상거래등에 서의 소비자보호에 관한
          법률(이하 '전자상거래법'이라 함)', '약관의 규제에 관한 법률(이하'
          약관규제법'이라 함)', '정보통신망 이용촉진 및 정보보호 등에 관한
          법률(이하 '정보통신망법'이라 함)' 등 본 서비스 와 관련된 법령에
          위배되지 않는 범위에서 이 약관을 변경할 수 있으며, 유스프레이는 약관이
          변경되는 경우에 변경된 약관의 내용과 시행일을 정하여, 그 시행일로부터
          최소 7일 (이용자에게 불리하거나 중대한 사항 의 변경은 30일) 이전부터
          시행일 후 상당한 기간 동안 공지하고, 기존 이용자에게는 변경된 약관,
          적용일 자 및 변경사유(변경될 내용 중 중요사항에 대한 설명을 포함)를
          별도의 전자적 수단(전자우편, 문자메시 지, 서비스 내 전자쪽지발송, 알림
          메시지를 띄우는 등의 방법)으로 개별 통지합니다. 변경된 약관은 공지
          하거나 통지한 시행일로부터 효력이 발생합니다. <br />
          2. 유스프레이가 제1항에 따라 개정약관을 공지 또는 통지하는 경우
          '변경에 동의하지 아니한 경우 공지일 또는 통지를 받은 날로부터
          7일(이용자에게 불리하거나 중대한 사항의 변경인 경우에는 30일) 내에
          계약을 해지 할 수 있으며, 계약해지의 의사표시를 하지 아니한 경우에는
          변경에 동의한 것으로 본다.' 라는 취지의 내 용을 함께 통지합니다.{" "}
          <br />
          3. 이용자가 제2항의 공지일 또는 통지를 받은 날로부터 7일(또는
          이용자에게 불리하거나 중대한 사항의 변 경인 경우에는 30일)내에 변경된
          약관에 대해 거절의 의사를 표시하지 않았을 때에는 본 약관의 변경에
          동의한 것으로 간주합니다.
          <TitleTag>제5조(이용자에 대한 통지) </TitleTag>
          1. 유스프레이는 이 약관에 별도 규정이 없는 한 이용자에게 전자우편,
          문자메시지(SMS), 전자쪽지, 푸쉬(Push)알림 등의 전자적 수단을 이용하여
          통지할 수 있습니다. <br />
          2. 유스프레이는 이용자 전체에 대한 통지의 경우 7일 이상 유스프레이가
          운영하는 웹사이트 내의 게시판에 게시함으로써 제1항의 통지에 갈음할 수
          있습니다. 다만, 이용자 본인의 거래와 관련하여 중대한 영향을 미치는
          사항에 대하여는 제1항의 개별 통지를 합니다. <br />
          3. 유스프레이는 이용자의 연락처 미기재, 변경 후 미수정, 오기재 등으로
          인하여 개별 통지가 어려운 경우에 한하여 전항의 공지를 함으로써 개별
          통지를 한 것으로 간주합니다.
          <TitleTag>제6조(이용계약의 체결) </TitleTag>
          이용계약은 다음의 경우에 체결됩니다. <br />
          1. 이용자가 회원으로 가입하고자 하는 경우 이용자가 약관의 내용에
          대하여 동의를 한 다음 회원가입신청을 하고 유스프레이가 이러한 신청에
          대하여 승낙한 때 <br />
          2. 이용자가 회원가입 없이 이용할 수 있는 서비스에 대하여 회원 가입의
          신청없이 서비스를 이용하고자 하는 경우에는 유스프레이 서비스 이용을
          위해 결제하는 때 <br />
          3. 이용자가 회원가입 없이 이용할 수 있는 서비스에 대하여 회원가입의
          신청없이 무료 서비스를 이용하고 자 하는 경우에는 그 무료 서비스와
          관련된 사항의 저장 등 부가서비스를 이용하면서 위 1호 및 2호의 절차를
          진행한 때<TitleTag>제7조(회원가입에 대한 승낙) </TitleTag>
          1. 유스프레이는 이용계약에 대한 요청이 있을 때 서비스 이용을 승낙함을
          원칙으로 합니다. <br />
          2. 전항에도 불구하고, 다음 각호의 사유에 해당하는 경우 유스프레이는
          회원가입을 보류하거나 거절하는 등 제한할 수 있습니다. <br />
          가. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는
          경우(단, 유스프레이의 재가입 승낙을 얻은 경우에는 예외로 함) <br />
          나. 실명이 아니거나 타인의 명의를 도용한 경우 <br />
          다. 유스프레이가 정하는 필수정보를 누락하거나 허위로 기재한 경우{" "}
          <br />
          라. 만 14세 미만의 아동, 만 19세 미만의 미성년자, 피한정후견인,
          피성년후견인이 법정대리인의 동의를 얻지 않은 경우 <br />
          마. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 이 약관 등
          유스프레이가 규정한 운영원칙을 위반한 경우 <br />
          바. 신용정보의 이용과 보호에 관한 법률에 따라 PC통신, 인터넷서비스의
          신용불량자로 등록되어 있는 경우 <br />
          사. 정보통신윤리위원회에 PC통신, 인터넷서비스의 불량이용자로 등록되어
          있는 경우 <br />
          아. 이미 사용 중인 회원정보 또는 공서양속을 저해하는 아이디를
          사용하고자 하는 경우 <br />
          3. 제1항에 따른 신청에 있어 유스프레이는 서비스 제공에 필요한 경우
          전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다. <br />
          4. 유스프레이는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상
          문제가 있는 경우에는 승낙을 유보할 수 있습니다. <br />
          5. 에 따라 서비스 이용을 승낙하지 아니하거나 유보한 경우, 유스프레이는
          원칙적으로 이를 서비스 이용 신청자에게 알리도록 합니다. 단,
          유스프레이의 귀책사유 없이 이용자에게 알릴 수 없는 경우에는 예외로
          합니다. <br />
          6. 이용계약의 성립 시기는 제6조 제1호의 경우에는 유스프레이가
          가입완료를 신청절차 상에서 표시한 시점, 제6조 제2호의 경우에는 결제가
          완료되었다는 표시가 된 시점으로 합니다. <br />
          7. 유스프레이는 회원에 대해 유스프레이정책에 따라 등급별로 구분하여
          이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수
          있습니다. <br />
          8. 유스프레이는 회원에 대하여 '영화및비디오물의진흥에관한법률' 및
          '청소년보호법' 등에 따른 등급 및 연령 준수를 위하여 이용제한이나
          등급별 제한을 둘 수 있습니다.
          <TitleTag>제8조(회원정보의 변경) </TitleTag>
          1. 회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를
          열람하고 수정할 수 있습니다. 다만, 서 비스 관리를 위해 필요한 실명,
          아이디 등은 수정이 불가능합니다. <br />
          2. 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로
          수정을 하거나 전자우편 기타 방법 으로 유스프레이에 대하여 그
          변경사항을 알려야 합니다. <br />
          3. 제2항의 변경사항을 유스프레이에 알리지 않아 발생한 불이익에
          대하여는 회원에게 책임이 있습니다.
          <TitleTag>제9조(회원정보의 관리 및 보호) </TitleTag>
          1. 회원의 아이디(ID)와 비밀번호에 관한 관리책임은 회원에게 있으며,
          이를 제3자가 이용하도록 하여서는 안 됩니다. <br />
          2. 유스프레이는 회원의 아이디(ID)가 개인정보 유출 우려가 있거나,
          반사회적 또는 공서양속에 어긋나거나, 유스프레이 또는 서비스의 운영자로
          오인할 우려가 있는 경우, 해당 아이디(ID)의 이용을 제한할 수 있습니다.{" "}
          <br />
          3. 회원은 아이디(ID) 및 비밀번호가 도용되거나 제3자가 사용하고 있음을
          인지한 경우에는 이를 즉시 유스프레이에 통지하고 안내에 따라야 합니다.{" "}
          <br />
          4. 제3항의 경우 해당 회원이 유스프레이에 그 사실을 통지하지 않거나,
          통지하였으나 유스프레이의 안내에 따르지 않아 발생한 불이익에 대하여
          유스프레이는 책임지지 않습니다.
          <TitleTag>제10조(유스프레이의 의무) </TitleTag>
          1. 유스프레이는 계속적이고 안정적인 서비스의 제공을 위하여 설비에
          장애가 생기거나 멸실된 때에는 이를 지체없이 수리 또는 복구하며, 다음
          각 호의 사유 발생 시 부득이한 경우 예고 없이 서비스의 전부 또는 일부의
          제공을 일시 중지할 수 있습니다. 이 경우 그 사유 및 중지 기간 등을
          이용자에게 지체 없이 사후 공지합니다. 가. 시스템의 긴급점검, 증설,
          교체, 시설의 보수 또는 공사를 하기 위하여 필요한 경우 나. 새로운
          서비스를 제공하기 위하여 시스템교체가 필요하다고 판단되는 경우 다.
          시스템 또는 기타 서비스 설비의 장애, 유무선 Network 장애 등으로
          정상적인 서비스 제공이 불가능할 경우 라. 국가비상사태, 정전,
          불가항력적 사유로 인한 경우 <br />
          2. 유스프레이는 이용계약의 체결, 계약사항의 변경 및 해지 등 이용자와의
          계약관련 절차 및 내용 등에 있어 이용자에게 편의를 제공하도록
          노력합니다. <br />
          3. 유스프레이는 대표자의 성명, 상호, 주소, 전화번호,
          모사전송번호(FAX), 통신판매업 신고번호, 이용약관, 개인정보취급방침
          등을 이용자가 쉽게 알 수 있도록 온라인 서비스초기화면에 게시합니다.
          <TitleTag>제11조(개인정보보호) </TitleTag>
          1. 유스프레이는 이용자들의 개인정보를 중요시하며, 정보통신망 이용촉진
          및 정보보호 등에 관한 법률, 개인정보 보호법 등 관련 법규를 준수하기
          위해 노력합니다. 유스프레이는 개인정보보호정책을 통하여 이용자가
          제공하 는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며
          개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. <br />
          2. 유스프레이는 최종 사용일로부터 연속하여 1년 동안 서비스 사용 이력이
          없는 경우 '개인정보보호법' 및 같은 법 시행령의 규정에 따라
          이용자정보를 다른 이용자의 개인정보와 분리하여 별도로 저장 및 관리할
          수 있습 니다. 이때 분리 저장된 이용자의 개인정보는 이용자가
          회원탈퇴신청 또는 개인정보삭제 요청을 할때까 지 보관됩니다. <br />
          3. 유스프레이가 이용자의 개인정보의 보호 및 사용에 대해서 관련 법규 및
          유스프레이의 개인정보처리방침을 적용합니다. 다만, 유스프레이에서
          운영하는 웹 사이트 등에서 링크된 외부 웹페이지에서는 유스프레이의
          개인정보처리방침이 적용되지 않습니다.
          <TitleTag>제12조(이용자의 의무) </TitleTag>
          1. 이용자는 이용자가입을 통해 이용신청을 하는 경우 사실에 근거하여
          신청서를 작성해야 합니다. 이용자 가 허위, 또는 타인의 정보를 등록한
          경우 유스프레이에 대하여 일체의 권리를 주장할 수 없으며, 유스프레이는
          이로 인 하여 발생한 손해에 대하여 책임을 부담하지 않습니다. <br />
          2. 이용자는 본 약관에서 규정하는 사항과 기타 유스프레이가 정한 제반
          규정, 유스프레이가 공지하는 사항을 준수하여야 합니다. 또한 이용자는
          유스프레이의 업무를 방해하는 행위 및 유스프레이의 명예를 훼손하는
          행위를 하여서는 안 됩니다. <br />
          3. 이용자는 주소, 연락처, 전자우편 주소 등 회원정보가 변경된 경우 즉시
          온라인을 통해 이를 수정해야 합 니다. 이 때 변경된 정보를 수정하지
          않거나 수정이 지연되어 발생하는 책임은 이용자가 지게 됩니다. <br />
          4. 이용자는 이용자에게 부여된 아이디와 비밀번호를 직접 관리해야
          합니다. 이용자의 관리 소홀로 발생한 문제는 유스프레이가 책임을
          부담하지 않습니다. <br />
          5. 이용자가 아이디, 닉네임, 기타 서비스 내에서 사용되는 명칭 등을
          선정할 때에는 다음 각 호에 해당하는 행위를 해서는 안 됩니다. 가.
          유스프레이가 제공하는 서비스의 공식 운영자를 사칭하거나 이와 유사한
          명칭을 사용하여 다른 이용자에게 혼란을 주는 행위 나. 선정적이고 음란한
          내용이 포함된 명칭을 사용하는 행위 다. 제3자의 상표권, 저작권 등
          권리를 침해할 가능성이 있는 명칭을 사용하는 행위 라. 제3자의 명예를
          훼손하거나, 그 업무를 방해할 가능성이 있는 명칭을 사용하는 행위 마.
          기타 반사회적이고 관계법령에 저촉되는 내용이 포함된 명칭을 사용하는
          행위 <br />
          6. 이용자는 유스프레이의 명시적 동의가 없는 한 서비스 이용권한, 기타
          이용계약상의 지위에 대하여 매도, 증여, 담보제공 등 처분행위를 할 수
          없습니다. <br />
          7. 본 조와 관련하여 서비스 이용에 있어 주의사항 등 그 밖의 자세한
          내용은 운영정책으로 정하며, 이용자가 서비스 이용약관 및 운영정책을
          위반하는 경우 서비스 이용제한, 민형사상의 책임 등 불이익이 발생할 수
          있습니다.
          <TitleTag>제13조(서비스의 제공) </TitleTag>
          1. 유스프레이의 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다.
          다만 유스프레이 시스템의 유지 보수를 위한 점 검, 통신장비의 교체 등
          특별한 사유가 있는 경우 서비스의 전부 또는 일부에 대하여 일시적인 제공
          중단 이 발생할 수 있습니다. <br />
          2. 유스프레이가 제공하는 개별 서비스에 대한 구체적인 안내사항은 개별
          서비스 화면에서 확인할 수 있습니다. 3. 유스프레이가 제공하는 서비스의
          내용은 다음과 같습니다. 가. 기도제목 입력받고 저장하는 서비스 나.
          저장된 기도제목 공유 서비스
          <TitleTag>제14조(서비스의 제한 등) </TitleTag>
          1. 유스프레이는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가
          발생하거나 발생할 우려가 있는 경우와 전 기통신사업법에 의한
          기간통신사업자가 전기통신서비스를 중지하는 등 부득이한 사유가 있는
          경우에는 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.{" "}
          <br />
          2. 무료서비스는 전항의 규정에도 불구하고, 유스프레이의 운영정책 등의
          사유로 서비스의 전부 또는 일부가 제한되거나 중지될 수 있으며, 유료로
          전환될 수 있습니다. <br />
          3. 유스프레이는 서비스의 이용을 제한하거나 정지하는 때에는 그 사유 및
          제한기간, 예정 일시 등을 지체없이 이용자에게 알립니다. <br />
          4. 유스프레이는 사전에 결제정보를 입력 받고, 무료로 제공중인 서비스를
          유료로 전환할 경우, 그 사유와 유료 전환 예정 일시를 통지하고 유료
          전환에 대한 이용자의 동의를 받습니다.
          <TitleTag>제15조(서비스의 해제·해지 및 탈퇴 절차) </TitleTag>
          1. 이용자가 이용 계약을 해지하고자 할 때는 언제든지 홈페이지상의
          이용자 탈퇴 신청을 통해 이용계약 해 지를 요청할 수 있습니다. 단,
          신규가입 후 일정 시간 동안 서비스 부정이용 방지 등의 사유로 즉시
          탈퇴가 제한될 수 있습니다. <br />
          2. 유스프레이는 이용자가 본 약관에서 정한 이용자의 의무를 위반한 경우
          등 비정상적인 이용 또는 부당한 이용과 이용자 금지프로그램 사용하는
          경우 또는 타인의 명예를 훼손하거나 모욕하는 방송과 게시물을 작성한
          경우 이러한 행위를 금지하거나 삭제를 요청하였음에도 불구하고 최초의
          금지 또는 삭제 요청을 포함하 여 2회 이상 누적되는 경우 이용자에게
          통지하고, 계약을 해지할 수 있습니다. <br />
          3. 유스프레이는 이용자의 청약철회, 해제 또는 해지의 의사표시를 수신한
          후 그 사실을 이용자에게 회신합니다. 회신은 이용자가 유스프레이에
          대하여 통지한 방법 중 하나에 의하고, 이용자가 유스프레이에 대하여
          통지한 연락처가 존 재하지 않는 경우에는 회신하지 않을 수 있습니다.
          <TitleTag>제16조(손해배상) </TitleTag>
          1. 유스프레이 또는 이용자는 상대방의 귀책에 따라 손해가 발생하는 경우
          손해배상을 청구할 수 있습니다. 다만, 유스프레이는 무료서비스의 장애,
          제공 중단, 보관된 자료 멸실 또는 삭제, 변조 등으로 인한 손해에
          대하여는 배 상책임을 부담하지 않습니다. <br />
          2. 유스프레이가 제공하는 서비스의 이용과 관련하여 유스프레이의
          운영정책 및 개인 정보 보호정책, 기타 서비스별 이용 약관에서 정하는
          내용에 위반하지 않는 한 유스프레이는 어떠한 손해에 대하여도 책임을
          부담하지 않습니다.
          <TitleTag>제17조(면책사항) </TitleTag>
          1. 유스프레이는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
          제공할 수 없는 경우에는 서비스 제공에 관한 책임을 지지 않습니다.{" "}
          <br />
          2. 유스프레이는 이용자의 귀책사유로 인한 서비스 이용장애에 대하여
          책임을 지지 지 않습니다. <br />
          3. 유스프레이는 이용자가 서비스를 이용하며 기대하는 수익을 얻지 못한
          것에 대하여 책임 지지 않으며 서비스를 통하여 얻은 자료로 인한 손해
          등에 대하여도 책임을 지지 않습니다. <br />
          4. 유스프레이는 이용자가 웹페이지에 게재한 내용의 신뢰도, 정확성 등
          내용에 대해서는 책임지지 않으며, 이용자 상호간 또는 이용자와 제3자
          상호간 서비스를 매개로 발생한 분쟁에 개입하지 않습니다.
          <TitleTag>제18조(정보의 제공 및 광고 게재) </TitleTag>
          1. 유스프레이는 이용자가 서비스 이용 중 필요하다고 인정되는 각종 정보
          및 광고를 배너 게재, 전자우편(E-Mail), 휴대폰 메세지, 전화, 우편 등의
          방법으로 이용자에게 제공(또는 전송)할 수 있습니다. 다만, 이용자는 이
          를 원하지 않을 경우 유스프레이가 제공하는 방법에 따라 수신을 거부할 수
          있습니다. <br />
          2. 이용자가 수신 거부를 한 경우에도 이용약관, 개인정보보호정책, 기타
          이용자의 이익에 영향을 미칠 수 있 는 중요한 사항의 변경 등
          '정보통신망이용촉진 및 정보보호 등에 관한 법률'에서 정하는 사유 등
          이용자가 반드시 알고 있어야 하는 사항에 대하여는 전자우편 등의
          방법으로 정보를 제공할 수 있습니다. <br />
          3. 제1항 단서에 따라 이용자가 수신 거부 조치를 취한 경우 이로 인하여
          유스프레이가 거래 관련 정보, 이용 문의에 대한 답변 등의 정보를
          전달하지 못한 경우 유스프레이는 이로 인한 책임이 없습니다. <br />
          4. 유스프레이는 '정보통신망법' 시행령에 따라 2년마다 영리 목적의
          광고성 정보 전송에 대한 수신동의 여부를 확인합니다. <br />
          5. 유스프레이는 광고주의 판촉 활동에 이용자가 참여하거나, 거래의
          결과로서 발생하는 손실 또는 손해에 대하여는 책임을 지지 않습니다.
          <TitleTag>제19조(유료서비스의 결제 등) </TitleTag>
          1. 유스프레이가 제공하는 유료서비스를 이용하는 경우 이용자는
          이용대금을 납부하는 것을 원칙으로 합니다. 이 때 유스프레이가 제공하는
          유료서비스에 대한 이용요금의 결제방법은 아래 각 호와 같습니다. <br />
          가. 인앱결제 <br />
          2. 유스프레이는 이용자가 결제수단에 대해 정당한 사용권한을 가지고
          있는지의 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 거래
          진행을 중지하거나, 확인이 불가한 해당 거래를 취소할 수 있습니다.{" "}
          <br />
          3. 유스프레이의 정책 및 제1항의 결제업체(이동통신사, 카드사 등) 및
          결제대행업체의 기준에 따라 이용자 당월 누적 결제액 및 충전한도가
          제한될 수 있습니다. 해당 기준을 초과한 경우 유료서비스의 추가 이용은
          불가능할 수 있습니다. <br />
          4. 이용자가 대금의 지급이나 결제를 위하여 입력한 정보에 대한 책임은
          이용자에게 있습니다.
          <TitleTag>제20조(환불) </TitleTag>
          1. 이용자의 귀책사유로 결제를 취소, 환불하는 경우에는 다음의 절차에
          따릅니다. <br />
          가. 1회로 이용 또는 구매가 완료되는 서비스는 환불이 불가능 합니다.{" "}
          <br />
          나. 지속적으로 이용가능한 서비스는 이용일수에 해당하는 금액을 차감한
          나머지 금액을 환불합니다. <br />
          2. 전항의 규정에도 불구하고 아래 각 호의 경우에는 결제한 전액을
          환불합니다. - 결제를 완료한 후 서비스 이용 내역이 없는 경우 - 서비스
          장애 등 유스프레이의 귀책사유로 서비스를 이용하지 못한 경우 - 구매한
          서비스가 제공되지 않은 경우 - 구매한 서비스가 표시 또는 광고 등과
          상이하거나 현저한 차이가 있는 경우 - 서비스 자체의 결함으로 서비스
          이용이 현저히 불가능 하였던 경우 <br />
          3. 유스프레이는 환불시 이용대금의 결제수단과 동일한 방법으로 환불하는
          것을 원칙으로 합니다. 다만, 동일한 결제수단으로 환불이 불가능한 경우
          유스프레이가 개별서비스에서 정하는 별도의 방법으로 환불합니다. <br />
          4. 유스프레이는 환불 의무가 발생한 날로부터 3영업일 내에 환불절차를
          진행합니다. 다만, 환불을 위하여 이용자 의 협조가 필요한 경우 이용자의
          귀책사유로 환불이 지연된 경우 유스프레이는 지연이자를 부담하지
          않습니다. <br />
          5. 환불에 필요한 비용은 귀책사유가 있는 쪽이 부담합니다.
          <TitleTag>제21조(권리의 귀속) </TitleTag>
          1. 유스프레이가 제공하는 서비스에 대한 저작권 등 지식재산권은
          유스프레이에 귀속됩니다. <br />
          2. 유스프레이는 서비스와 관련하여 이용자에게 유스프레이가 정한 조건
          따라 유스프레이가 제공하는 서비스를 이용할 수 있는 권한만을 부여하며,
          이용자는 이를 양도, 판매, 담보제공 하는 등 처분행위를 할 수 없습니다.{" "}
          <br />
          3. 제1항의 규정에도 불구하고 이용자가 직접 작성한 콘텐츠 및
          유스프레이의 제휴계약에 따라 제공된 저작물에 대 한 지식재산권은
          유스프레이에 귀속되지 않습니다.
          <TitleTag>제22조(콘텐츠의 관리) </TitleTag>
          1. 회원이 작성 또는 창작한 콘텐츠가 '개인정보보호법' 및 '저작권법 등
          관련 법에 위반되는 내용을 포함하는 경우, 관리자는 관련 법이 정한
          절차에 따라 해당 콘텐츠의 게시중단 및 삭제 등을 요청할 수 있으며,
          유스프레이는 관련 법에 따라 조치를 취하여야 합니다. <br />
          2. 유스프레이는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가
          인정될 만한 사유가 있거나 기타 유스프레이 정책 및 관련 법에 위반되는
          경우에는 관련 법에 따라 해당 콘텐츠에 대해 임시조치 등을 취할 수
          있습니다.
          <TitleTag>제23조(콘텐츠의 저작권) </TitleTag>
          1. 이용자가 서비스 내에 게시한 콘텐츠의 저작권은 해당 콘텐츠의
          저작자에게 귀속됩니다. <br />
          2. 제1항에 불구하고 유스프레이는 서비스의 운영, 전시, 전송, 배포, 홍보
          등의 목적으로 별도의 허락 없이 무상으 로 저작권법 및 공정한 거래관행에
          합치되는 범위 내에서 다음 각 호와 같이 회원이 등록한 콘텐츠를 사용 할
          수 있습니다. <br />
          가. 서비스 내에서 이용자가 작성한 콘텐츠의 복제, 수정, 전시, 전송,
          배포 등 저작권을 침해하지 않는 범위 내의 2차적저작물 또는 편집 저작물
          작성을 위한 사용. 다만, 해당 콘텐츠를 등록한 이용자가 해당 콘텐츠의
          삭제 또는 사용 중지를 요청하는 경우 유스프레이는 관련 법에 따라
          보존해야하는 사항을 제외하고 관련 콘텐츠를 모두 삭제 또는
          사용중지합니다. <br />
          나. 서비스의 운영, 홍보, 서비스 개선 및 새로운 서비스 개발을 위한 범위
          내의 사용 제24조(관할법원 및 준거법) 서비스와 관련하여 분쟁이 발생한
          경우 관할법원은 민사소송법에 따른 관할법원으로 정하며, 준거법은
          대한민국의 법령을 적용합니다.
          <TitleTag>부칙 </TitleTag>
          제1조(시행일) 본 약관은 2023.06.01부터 시행됩니다.
          <div style={{ marginBottom: "37px" }}></div>
        </div>
      </div>
    </>
  );
};

export default ToS;
