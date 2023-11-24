import styled from "styled-components";

const DeleteReasonOptionItem = ({ option: { text, checked }, onClick }) => {
  return (
    <S.Root onClick={onClick} checked={checked}>
      {text}
    </S.Root>
  );
};

export default DeleteReasonOptionItem;

const S = {
  Root: styled.button`
    // remove default button style
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;

    border-radius: 4px;

    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;

    ${({ checked }) =>
      checked
        ? `
    background-color: #75bd62;
    color: #ffffff;
    `
        : `
    background-color: #f8f8f8;
    color: #a0a0a0;
    `}

    padding: 12px;
    transition: all 0.3s ease-in-out;
  `,
};
