import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { useGetInfo } from "../../hooks/useGetInfo";
import SelectDateInput from "../SelectDateInput/SelectDateInput";

const BackgroundWrapper = styled.div`
  width: 100%;
  background-color: #7bab6e;
  overflow-y: hidden;
  height: 100vh;
`;

const BackgroundInput = styled.div`
  display: flex;
  position: relative;
  padding: 12px;
  border-radius: ${(props) => (props.visible ? "16px 16px 0px 0px" : "16px")};
  background: white;
  box-sizing: border-box;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const LogoTitle = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const MainComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 24px 16px;
  gap: ${(props) => (props.visible ? "0px" : "16px")};
  z-index: 103;
`;

const StyleInput = styled.input`
  border: none;
  font-size: 16px;
  color: #a0a0a0;
  outline: none;
  ::placeholder {
    color: #b7ceb0; // 원하는 색상으로 변경
  }
  font-style: normal;
  font-weight: 400;
  border-bottom: 1px solid #ebf6e8;
  width: 100%;
`;

const TemplateMain = ({ children, onInsert }) => {
  const { data: userInfo, refetch: refetch_userInfo } = useGetInfo();
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [updateDate, setUpdateDate] = useState(null); // 잠시 안쓰는 상태
  const [selectedBtn, setSelectedBtn] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  const widthChangeInput = () => {
    setShowSubModal(!showSubModal);
  };

  const dDayCalculate = (res_data) => {
    var today = new Date();
    var dday = new Date(res_data);
    dday.setHours(23, 59, 59);
    var diff = dday.getTime() - today.getTime();
    var result = Math.floor(diff / (1000 * 60 * 60 * 24));
    return result;
  };

  const submit = () => {
    setVisible(!visible);
    setValue("");
    var dday = dDayCalculate(updateDate);
    onInsert(name, dday, value);
    // setDayToggle(false);
    setShowSubModal(!showSubModal);
    setUpdateDate(null);
  };

  useEffect(() => {
    if (!userInfo) {
      refetch_userInfo();
      return;
    }
    setName(userInfo.data.name);
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      refetch_userInfo();
      return;
    }
    setName(userInfo.data.name);
  }, [userInfo]);

  return (
    <BackgroundWrapper>
      <MainComponent>
        {showSubModal ? "" : <LogoTitle>Uspray</LogoTitle>}
        <BackgroundInput>
          {showSubModal ? (
            <SelectDateInput
              {...{
                setShowSubModal,
                selectedBtn,
                setSelectedBtn,
                selectedDate,
                setSelectedDate,
                showDatePicker,
                setShowDatePicker,
                setUpdateDate,
                showSubModal,
                setValue,
                value,
              }}
              onClickFunc={submit}
              inputPlaceHolder={"기도제목을 입력해주세요"}
              maxlen={75}
              maxrow={3}
            />
          ) : (
            <StyleInput
              placeholder="기도제목을 입력해주세요"
              type="text"
              value={value}
              onClick={widthChangeInput}
            />
          )}
        </BackgroundInput>
      </MainComponent>
      {children}
    </BackgroundWrapper>
  );
};

export default TemplateMain;
