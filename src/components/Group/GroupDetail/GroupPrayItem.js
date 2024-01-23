import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { ToastTheme } from "../../Toast/Toast";
import useToast from "../../../hooks/useToast";
import BlackScreen from "../../BlackScreen/index";
import Modal from "../../Modal/Modal";
import { useGroupPray } from "../../../hooks/useGroupPray";
import PrayDateCategoryInput from "../../PrayDateCategoryInput/PrayDateCategoryInput";
import { useCategory } from "../../../hooks/useCategory";
import { ToastTheme } from "../../Toast/Toast";
import useToast from "../../../hooks/useToast";

const GroupPrayItem = ({ groupId, pray }) => {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast({});
  const [showSubModal, setShowSubModal] = useState(false);
  const [heart, setHeart] = useState(pray.heart);
  const [scrap, setScrap] = useState(pray.scrap);
  const { deleteGroupPray, likeGroupPray, scrapGroupPray } =
    useGroupPray(groupId);
  // 스크랩할 때 아래 기도 정보 사용
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const { categoryList, firstCategoryIndex } = useCategory("shared");

  // 기도를 스크랩하는 함수
  const onScrap = async (deadline, categoryId) => {
    scrapGroupPray(
      {
        groupPrayId: pray.groupPrayId,
        deadline: deadline,
        categoryId: categoryId,
      },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setPrayInputValue("");
          setDateInputValue(null);
          setScrap(true);
          showToast({
            message: "기도제목이 저장되었어요.",
            theme: ToastTheme.SUCCESS,
          });
        },
      }
    );
  };

  return (
    <Wrapper>
      {showModal && (
        <>
          <BlackScreen
            isModalOn={showModal}
            onClick={() => setShowModal(false)}
          />
          <Modal
            isModalOn={showModal}
            iconSrc={"images/ic_group_pray_delete.svg"}
            iconAlt={"group_pray_delete"}
            mainContent={"정말 삭제하시겠습니까?"}
            subContent={"해당 모임의 기도 목록에서 지워집니다."}
            btnContent={"삭제"}
            btnContent2={"취소"}
            onClickBtn={() => {
              deleteGroupPray(pray.groupPrayId);
              setShowModal(false);
              showToast({
                message: "모임에서 기도제목을 삭제했어요.",
                theme: ToastTheme.SUCCESS,
              });
            }}
            onClickBtn2={() => setShowModal(false)}
            modalTheme={2}
          />
        </>
      )}
      {showSubModal && (
        <PrayDateCategoryInput
          categoryList={categoryList}
          showSubModal={showSubModal}
          setShowSubModal={setShowSubModal}
          inputPlaceHodler={pray.content}
          maxrow={3}
          maxlen={75}
          isShowWordCount={false}
          isDefault={true}
          setUpdateValue={setPrayInputValue}
          setUpdateDate={setDateInputValue}
          setUpdateCategory={setCategoryInputValue}
          buttonText="내 기도수첩에 저장하기"
          value={pray.content}
          category={firstCategoryIndex}
          onClickFunc={() => onScrap(dateInputValue, categoryInputValue)}
        />
      )}
      <PrayItem>
        <PrayContent onClick={() => setShowModal(true)}>
          <div style={{ fontSize: "14px", color: "var(--color-green)" }}>
            {pray.authorName}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-group-pray-content)",
            }}
          >
            {pray.content}
          </div>
        </PrayContent>
        {!pray.owner && (
          <PrayButton>
            {heart ? (
              <img
                src="images/ic_group_heart_filled.svg"
                alt="filled_heart_icon"
              />
            ) : (
              <img
                onClick={() => {
                  setHeart(true);
                  likeGroupPray(pray.groupPrayId);
                }}
                src="images/ic_group_heart.svg"
                alt="heart_icon"
              />
            )}
            {scrap ? (
              <img
                src="images/ic_group_bookmark_filled.svg"
                alt="filled_bookmark_icon"
              />
            ) : (
              <img
                onClick={() => {
                  setCategoryInputValue(firstCategoryIndex);
                  setShowSubModal(true);
                }}
                src="images/ic_group_bookmark.svg"
                alt="bookmark_icon"
              />
            )}
          </PrayButton>
        )}
      </PrayItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #0000001a;
`;

const PrayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  word-break: break-all;
`;

const PrayButton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 8px;
  border-radius: 16px;
  height: fit-content;
  background-color: var(--color-group-pray-button-background);
`;

const PrayItem = styled.div`
  padding: 12px 16px;
  display: flex;
  gap: 40px;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
`;

export default GroupPrayItem;
