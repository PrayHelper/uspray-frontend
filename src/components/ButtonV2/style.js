import styled from "styled-components";
import { ButtonTheme } from "./ButtonV2";

export const ButtonStyle = styled.div`
  background: ${(props) => 
    props.buttonTheme === ButtonTheme.OUTLINED ? "transparent" : 
    props.disabled ? `linear-gradient(#0000004D, #0000004D), var(--color-dark-green)` : "var(--color-dark-green)"};
  border: ${(props) => 
    props.buttonTheme === ButtonTheme.OUTLINED ? "1px solid var(--color-dark-green)" : "none"};
  border-radius: 16px;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: ${(props) => 
    props.buttonTheme === ButtonTheme.OUTLINED ? "var(--color-dark-green)" : 
    props.disabled ? `rgba(255,255,255,0.3)` : "var(--color-white)"};
  padding: 20px 0px;
`;