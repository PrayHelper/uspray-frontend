import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GroupPrayItem from "./GroupPrayItem";
import { useGroupPray } from "../../../hooks/useGroupPray";
import useToast from "../../../hooks/useToast";
import { ToastTheme } from "../../Toast/Toast";
import PrayDateCategoryInput from "../../PrayDateCategoryInput/PrayDateCategoryInput";

const GroupPrayList = ({
  group,
  groupPrayList,
  isData,
  categoryList,
  firstCategoryIndex,
  setTab,
  tab,
}) => {
  // 기도제목 스크랩할 때 아래 기도 정보 사용
  const [showSubModal, setShowSubModal] = useState(false);
  const [scrapPrayInfo, setScrapPrayInfo] = useState(null);
  const [prayInputValue, setPrayInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const [scrapPrayId, setScrapPrayId] = useState(null);
  const { scrapGroupPray } = useGroupPray(group.id);
  const { showToast } = useToast({});
  const groupedData = Object.keys(groupPrayList).map((date) => {
    return {
      date,
      pray: groupPrayList[date],
    };
  });

  useEffect(() => {
    if (scrapPrayInfo) {
      setPrayInputValue(scrapPrayInfo.content);
      setDateInputValue(scrapPrayInfo.deadline);
      setCategoryInputValue(scrapPrayInfo.categoryId);
      setShowSubModal(true);
    }
  }, [scrapPrayInfo]);

  // 기도를 스크랩하는 함수
  const onScrap = async (deadline, categoryId) => {
    scrapGroupPray(
      {
        groupPrayId: scrapPrayInfo.groupPrayId,
        deadline: deadline,
        categoryId: categoryId,
      },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setPrayInputValue("");
          setDateInputValue(null);
          setScrapPrayId(scrapPrayInfo.groupPrayId);
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
      {showSubModal && (
        <PrayDateCategoryInput
          categoryList={categoryList}
          showSubModal={showSubModal}
          setShowSubModal={setShowSubModal}
          inputPlaceHodler={scrapPrayInfo.content}
          maxrow={3}
          maxlen={75}
          isShowWordCount={false}
          isDefault={true}
          setUpdateValue={setPrayInputValue}
          setUpdateDate={setDateInputValue}
          setUpdateCategory={setCategoryInputValue}
          buttonText="내 기도수첩에 저장하기"
          value={scrapPrayInfo.content}
          category={firstCategoryIndex}
          onClickFunc={() => onScrap(dateInputValue, categoryInputValue)}
        />
      )}
      {isData ? (
        <PrayList>
          {groupedData.map((data) => {
            return (
              <PrayContent key={data.date}>
                <DateDiv>{data.date}</DateDiv>
                {data.pray.map((pray) => (
                  <GroupPrayItem
                    key={pray.groupPrayId}
                    groupId={group.id}
                    pray={pray}
                    categoryList={categoryList}
                    firstCategoryIndex={firstCategoryIndex}
                    setTab={setTab}
                    tab={tab}
                    scrapPrayId={scrapPrayId}
                    setScrapPrayId={setScrapPrayId}
                    setCategoryInputValue={setCategoryInputValue}
                    setShowSubModal={setShowSubModal}
                    showSubModal={showSubModal}
                    setScrapPrayInfo={setScrapPrayInfo}
                    scrapPrayInfo={scrapPrayInfo}
                  />
                ))}
              </PrayContent>
            );
          })}
        </PrayList>
      ) : (
        <NoDataWrapper>
          <div>{group.name} 모임원에게</div>
          <div>기도제목을 공유해보세요.</div>
        </NoDataWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 145px);
  overflow: auto;
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-secondary-grey);
  font-size: 24px;
  font-weight: 700;
`;

const PrayList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PrayContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const DateDiv = styled.div`
  padding: 4px 8px;
  color: white;
  font-size: 12px;
  border-radius: 10px;
  width: fit-content;
  background-color: var(--color-green);
`;

export default GroupPrayList;
