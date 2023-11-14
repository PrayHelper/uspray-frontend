import styled from 'styled-components';
import { ButtonSize, ButtonTheme } from './Button';

export const BaseButtonStyle = styled.button`
  transition: all 0.2s ease-in-out;
  width: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "55px" : "100%"};
  height: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "33px" : ""};
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "center": "space-between"};
  align-items: center;
  padding: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "0px": "20px 24px 20px 16px"};
  font-size: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "12px": "16px"};
  border-radius: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "4px": "16px"};
  background-color: ${props => {
    let backgroundColor;
    switch (props.buttonTheme) {
      case ButtonTheme.GREEN:
        backgroundColor = props.disabled ? "#D0E8CB" : "#7BAB6E";
        break;
      case ButtonTheme.RED:
        backgroundColor = "#FF6B6B";
        break;
      case ButtonTheme.WHITE:
        backgroundColor = "#FFFFFF";
        break;
      default:
        backgroundColor = "#EEEEEE";
        break;
    }
    return backgroundColor;
  }};
  
  border: ${props => (props.buttonTheme === ButtonTheme.WHITE) ? "1px solid #7BAB6E": "none"};
  color: ${props => {
    let color;
    switch (props.buttonTheme) {
      case ButtonTheme.GREEN:
      case ButtonTheme.RED:
        color = "#FFFFFF";
        break;
      case ButtonTheme.WHITE:
        color = "#7BAB6E";
        break;
      default:
        color = "#A0A0A0";
        break;
    }
    return color;
  }};
  margin: ${props => (props.buttonTheme === ButtonTheme.WHITE) ? "-1px": "0px"};
  
  line-height: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "17px" : "23px"};
  font-weight: 500;
  cursor: pointer;

  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) => props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => props.disabled ? "1" : "0.98"};
  }
`

export const ModalButton = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: ${props => {
    if (props.buttonTheme === ButtonTheme.WHITE)
      return "#FFFFFF";
    else if (props.buttonTheme === ButtonTheme.GRAY)
      return "#f0f0f0";
    else if (props.buttonTheme === ButtonTheme.RED)
      return "#FF6B6B";
    else if (props.buttonTheme === ButtonTheme.GREEN)
        return "#7BAB6E";
    else if (props.buttonTheme === ButtonTheme.LIGHT_GREEN)
        return "#D0E8CB";
  }};
  border-style: ${props => (props.buttonTheme === ButtonTheme.WHITE) ? "1px solid #7bab6e" : "none"};
  border-radius: 16px;
  padding: 16px 0;
  color: ${props => {
    if (props.buttonTheme === ButtonTheme.WHITE || props.buttonTheme === ButtonTheme.LIGHT_GREEN)
      return "#7BAB6E";
    else if (props.buttonTheme === ButtonTheme.GRAY)
      return "#808080";
    else
      return "#FFFFFF";
  }};;
  font-size: 18px;
`;