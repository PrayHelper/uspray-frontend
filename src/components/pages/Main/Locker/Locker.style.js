import styled from "styled-components";

const S = {
  LockerWrapper: styled.div`
    z-index: 100;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: var(--color-light-green);
    justify-content: flex-end;
  `,
  LottieWrapper: styled.div`
    position: fixed;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  NoDataWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  NoDataTitle: styled.div`
    font-weight: 700;
    font-size: 28px;
    line-height: 41px;
    color: var(--color-dark-green);
  `,
  NoDataContent: styled.div`
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    color: var(--color-secondary-green);
  `,
  LockerList: styled.div`
    padding-top: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: auto;
  `,
  BottomButton: styled.div`
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
    cursor: pointer;
    width: 100%;
    font-weight: 500;
    text-align: center;
    padding: 20px 0px;
    background-color: var(--color-dark-green);
    color: var(--color-white);
  `,
};

export default S;
