import styled from "styled-components";
import { ReactComponent as DeleteUserFinishdIcon } from "../../images/ic_delete_user_finished.svg";
import { useNavigate } from "react-router-dom";

const DeleteUserFinishedView = () => {
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <S.Root>
      <S.IconAndDesciptionsWrapper>
        <DeleteUserFinishdIcon />
        <S.Description1>회원탈퇴가 되었습니다.</S.Description1>
        <S.Description2>
          회원탈퇴까지 최대 7일이 소요될 수 있습니다.
        </S.Description2>
      </S.IconAndDesciptionsWrapper>
      <S.BottomButton onClick={goToMainPage}>메인 화면으로 이동</S.BottomButton>
    </S.Root>
  );
};

export default DeleteUserFinishedView;

const S = {
  Root: styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
  `,
  IconAndDesciptionsWrapper: styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Description1: styled.div`
    margin-top: 24px;

    font-size: 26px;
    font-weight: 600;
    line-height: 28px;
    color: var(--color-dark-grey);
  `,
  Description2: styled.div`
    margin-top: 12px;

    font-size: 16px;
    line-height: 16px;
    color: var(--color-grey);
  `,
  BottomButton: styled.button`
    // remove default button style
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;

    width: 100%;
    font-weight: 500;
    line-height: 23px;
    text-align: center;

    padding: 20px;

    background-color: var(--color-dark-green);
    color: var(--color-white);

    position: fixed;
    bottom: 0;
  `,
};
