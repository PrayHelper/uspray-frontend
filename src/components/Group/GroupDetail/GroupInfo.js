import React, { useState } from "react";
import styled from "styled-components";
import PrayDateCategoryInput from "../../PrayDateCategoryInput/PrayDateCategoryInput";
import BlackScreen from "../../BlackScreen/BlackScreen";
import Modal from "../../../components/Modal/Modal";
import { useGroupPray } from "../../../hooks/useGroupPray";

const GroupInfo = ({
  group,
  isData,
  categoryList,
  firstCategoryIndex,
  shareMode,
  setShareMode,
}) => {
  const { addGroupPray, groupHeartCount } = useGroupPray(group.id);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);

  const onClickPrayInput = () => {
    if (categoryList.length === 0) {
      setShowModal(true);
    } else {
      setShowSubModal(!showSubModal);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 기도를 추가하는 함수
  const onInsert = async (text, deadline, categoryId) => {
    addGroupPray(
      {
        content: text,
        deadline: deadline,
        categoryId: categoryId,
        groupId: group.id,
      },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setPrayInputValue("");
          setDateInputValue(null);
        },
      }
    );
  };

  return (
    <Wrapper>
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
      {isData ? (
        <GroupInfoText>
          <div>
            <span style={{ color: "var(--color-green)" }}>{group.name} </span>
            <span>모임에서는</span>
          </div>
          <div>
            <span>기도가 </span>
            <span style={{ color: "var(--color-green)" }}>
              {groupHeartCount}번{" "}
            </span>
            <span>쌓였어요!</span>
          </div>
        </GroupInfoText>
      ) : (
        <GroupInfoText>
          <div>
            <span style={{ color: "var(--color-green)" }}>{group.name}</span>
            <span> 모임이</span>
          </div>
          <div>새롭게 태어났어요!</div>
        </GroupInfoText>
      )}
      <PrayInput>
        <>
          <PrayDateCategoryInput
            categoryList={categoryList}
            showSubModal={showSubModal}
            setShowSubModal={setShowSubModal}
            inputPlaceHodler="기도제목을 입력해주세요"
            maxrow={3}
            maxlen={75}
            isShowWordCount={true}
            isDefault={false}
            setUpdateValue={setPrayInputValue}
            setUpdateDate={setDateInputValue}
            setUpdateCategory={setCategoryInputValue}
            buttonText="기도제목 작성"
            value={prayInputValue}
            category={firstCategoryIndex}
            onClickFunc={
              () => onInsert(prayInputValue, dateInputValue, categoryInputValue) // GroupPray 버전으로 바꿔야 됨
            }
          />

          <Input
            type="text"
            placeholder="기도제목을 입력해주세요"
            style={{
              width: "100%",
            }}
            onClick={() => onClickPrayInput()}
            value={prayInputValue}
            readOnly
          />
        </>
        <LoadButton
          onClick={() => {
            setShareMode(true);
          }}
        >
          <img src="images/ic_group_load.svg" alt="group_load_icon" />
          <div>불러오기</div>
        </LoadButton>
      </PrayInput>
    </Wrapper>
  );
};

export default GroupInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 145px;
  background-color: var(--color-light-green);
  padding: 24px 16px;
  gap: 24px;
`;

const PrayInput = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const LoadButton = styled.div`
  display: flex;
  color: white;
  border-radius: 16px;
  background-color: var(--color-dark-green);
  padding: 14px 12px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

const GroupInfoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--color-green-80);
`;

const Input = styled.input`
  width: calc(100%-16px);
  height: 51px;
  border-radius: 16px;
  padding: 0px 16px;
  ::placeholder {
    color: var(--color-secondary-green);
    font-weight: 400;
  }
  outline: none;
  border: 0;
  color: var(--color-green);
  font-weight: 400;
  letter-spacing: -0.64px;
  font-size: 16px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
`;
