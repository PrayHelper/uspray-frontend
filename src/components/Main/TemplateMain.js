import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
import DisableImage from "../../images/ic_disable_image.svg";
import noClickImage from "../../images/no_click_image.svg";
import { useGetInfo } from "../../hooks/useGetInfo";
const BackgroundInput = styled.div`
  display: flex;
  position: relative;
  padding: 0px 24px 24px 35px;
  background: white;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  align-items: center;
  z-index: 103;
  transition: all 0.5s ease-in-out;
`;
const BtnSend = styled.button`
  width: 31px;
  height: 31px;
  border: 1px solid #ebf7e8;
  border-radius: 6.261px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background-color: white;
  transition: all 0.5s ease-in-out;
  &:active {
    transition: all 0.5s ease-in-out;
    background-color: #75bd62;
  }
`;

const BlankBtnSend = styled.button`
  width: 31px;
  height: 31px;
  border: 1px solid #ebf7e8;
  border-radius: 6.261px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background-color: white;
  transition: all 0.5s ease-in-out;
`;

const SendImg = styled(Logo)`
  width: 16.21px;
  height: 16.94px;
  transform: scaleX(-1);
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    transition: all 0.5s ease-in-out;
    filter: brightness(5);
  }
`;

const BlankSendImg = styled(Logo)`
  width: 16.21px;
  height: 16.94px;
  transform: scaleX(-1);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.3s ease-in-out;
`;

const StyleInput = styled.input`
  width: 100%;
  margin-top: 69px;
  margin: 69px 12px 0px 12px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  color: #a0a0a0;
  outline: none;
  border-bottom: 1px solid #ebf7e8;
  ::placeholder {
    color: #b7ceb0; // 원하는 색상으로 변경
  }
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyleName = styled.input`
  width: 48px;
  font-size: 16px;
  font-family: Noto Sans KR;
  font-weight: 400;
  color: #75bd62;
  outline: none;
  border: none;
  border-bottom: 1px solid #ebf7e8;
  margin-top: 69px;
`;

const TemplateMain = ({
  children,
  onInsert,
  shareToggle,
  setshareToggle,
  isShare,
  setIsShare,
}) => {
  const { data: userInfo, refetch: refetch_userInfo } = useGetInfo();
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [day, setDay] = useState(7);
  const [Toggle, setToggle] = useState(true);
  const [updateDate, setUpdateDate] = useState(null);
  const [dayToggle, setDayToggle] = useState(false);

  const widthChange = () => {
    setVisible(!visible);
    if (shareToggle) {
      setshareToggle(!shareToggle);
      setIsShare(!isShare);
    }
  };
  const dayInfo = (e) => {
    setDay(e);
  };

  const onSubmit = () => {
    if (day === 0) {
      setVisible(!visible);
    }
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onName = (e) => {
    if (e.target.value.length < 5) {
      setName(e.target.value);
    }
  };
  const submit = () => {
    setVisible(!visible);
    setValue("");
    onInsert(name, day, value);
    setDay(7);
    setDayToggle(false);
    setUpdateDate(null);
  };
  const changeCheckTop = () => {
    setVisible(!visible);
    if (Toggle == false) {
      setToggle(!Toggle);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      refetch_userInfo();
      return;
    }
    setName(userInfo.data.name);
  }, [userInfo]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ position: "relative" }}>
        <BackgroundInput
          style={{ boxShadow: !visible ? "0 2px 4px rgba(0, 0, 0, 0.2)" : "" }}>
          <StyleName
            placeholder={name}
            type="text"
            value={name}
            onChange={onName}></StyleName>
          <StyleInput
            placeholder="기도제목을 입력해주세요"
            type="text"
            value={value}
            onChange={onChange}
            onClick={!visible ? () => widthChange() : onSubmit()}></StyleInput>
          <div
            style={{ marginTop: "65px", minHeight: "31px", minWidth: "31px" }}>
            {value === "" ? (
              <BlankBtnSend>
                <BlankSendImg src={DisableImage} />
              </BlankBtnSend>
            ) : (
              <BtnSend onClick={() => submit()}>
                <SendImg src={noClickImage} />
              </BtnSend>
            )}
          </div>
        </BackgroundInput>
        <DayButton
          dayInfo={dayInfo}
          visible={visible}
          dayToggle={dayToggle}
          setDayToggle={setDayToggle}
          updateDate={updateDate}
          setUpdateDate={setUpdateDate}
        />
      </div>
      <BackgroundBright
        onClick={changeCheckTop}
        style={{
          opacity: visible ? "1" : "0",
          pointerEvents: visible ? "auto" : "none",
        }}
      />
      {children}
    </div>
  );
};

export default TemplateMain;
