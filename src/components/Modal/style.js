import styled from "styled-components";
import { ModalTheme } from "./Modal";

export const ModalWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${(props) =>
    props.isModalOn ? "translate(-50%, -50%)" : "translate(-50%, -40%)"};
  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  color: #7bab6e;
  z-index: 500;
  opacity: ${(props) => (props.isModalOn ? "1" : "0")};
  pointer-events: ${(props) => (props.isModalOn ? "auto" : "none")};
`;

export const ModalIcon = styled.img`
  margin: 8px;
`;

export const ModalMainContent = styled.div`
  font-size: 24px;
  color: ${(props) =>
    props.modalTheme === ModalTheme.NORMAL ? "#7bab6e" : "#FF6B6B"};
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const ModalSubContent = styled.div`
  margin-top: 2px;
  margin-bottom: 42px;
  font-size: 18px;
  font-weight: 400;
  color: ${(props) =>
    props.modalTheme === ModalTheme.NORMAL ? "#7bab6e" : "#FF6B6B"};
  letter-spacing: -0.02em;
`;

export const ModalBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

export const ModalBtn = styled.div`
  transition: 0.2s all ease-in-out;
  width: 100%;
  flex-grow: 1;
  flex-basis: 0;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #ffffff;
  font-size: 20px;
  text-align: center;

  &:active {
    transition: 0.2s all ease-in-out;
    transform: scale(0.98);
    filter: brightness(0.9);
  }
`;
