import BlackScreen from "../../../BlackScreen";
import Modal from "../../../Modal/Modal";

const MainCategoryAlertModal = ({ showAlertModal, handleCloseModal }) => (
  <>
    <BlackScreen isModalOn={showAlertModal} onClick={handleCloseModal} />
    <Modal
      isModalOn={showAlertModal}
      iconSrc={"images/icon_notice.svg"}
      iconAlt={"icon_notice"}
      mainContent={"카테고리를 먼저 추가해주세요!"}
      subContent={"기도제목은 카테고리 안에서 생성됩니다."}
      btnContent={"네, 그렇게 할게요."}
      onClickBtn={handleCloseModal}
    />
  </>
);

export default MainCategoryAlertModal;
