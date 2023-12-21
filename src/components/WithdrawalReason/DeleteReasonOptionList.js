import styled from "styled-components";
import DeleteReasonOptionItem from "./DeleteReasonOptionItem";

const DeleteReasonOptionList = ({
  deleteReasonOptionList,
  toggleOptionById,
}) => {
  const onClickOptionItemGenerator = (id) => () => {
    toggleOptionById(id);
  };

  return (
    <S.Root>
      {deleteReasonOptionList.map((option) => (
        <DeleteReasonOptionItem
          key={option.id}
          option={option}
          onClick={onClickOptionItemGenerator(option.id)}
        />
      ))}
    </S.Root>
  );
};

export default DeleteReasonOptionList;

const S = {
  Root: styled.div`
    display: flex;
    flex-direction: column;

    gap: 8px;

    margin: 16px 0 8px 0;
  `,
};
