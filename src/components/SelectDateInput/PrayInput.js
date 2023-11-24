import { useState } from "react";
import styled from "styled-components";
import SelectDateInput from "./selectDateInput";
/*
  props 넘겨받을 목록
    1. onClickFunc (기도제목 작성 클릭 함수)
    2. setUpdateDate (날짜 저장용)
    3. setInputValue (내용 저장용)

*/
const PrayInput = (props) => {
  const [showSubModal, setShowSubModal] = useState(false);
  const [updateValue, setUpdateValue] = useState("");

  const onClickInput = () => {
    setShowSubModal(!showSubModal);
  };

  return (
    <>
      <InputWrapper>
        <Input
          readOnly
          placeholder="기도제목을 입력해주세요"
          onClick={onClickInput}
          value={updateValue}
        />
      </InputWrapper>
      <SelectDateInput
        setInputValue={props.setInputValue}
        setUpdateDate={props.setUpdateDate}
        setUpdateValue={setUpdateValue}
        setShowSubModal={setShowSubModal}
        showSubModal={showSubModal}
        onClickFunc={props.onClickFunc}
      />
    </>
  );
};

export default PrayInput;

const InputWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 16px 16px 12px 16px;
  background-color: var(--color-white);
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  color: #606060;
  outline: none;
  border-bottom: 1px solid var(--color-white-green);
  ::placeholder {
    color: #b7ceb0;
  }
  :focus {
    border-bottom: 1px solid var(--color-dark-green);
  }
  font-weight: 400;
`;
