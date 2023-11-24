import { ToggleButtonStyle } from "./style";

const ToggleButton = ({isErrored, contents, item, setter}) => {

  const handleClick = () => {
    if (item === contents) {
      setter(null);
    } else {
      setter(contents);
    }
  }

  return (
    <ToggleButtonStyle isErrored={isErrored} isClicked={item === contents} onClick={handleClick}>
      {contents}
    </ToggleButtonStyle>
  );
}

export default ToggleButton;
