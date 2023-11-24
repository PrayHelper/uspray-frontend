import { BlackScreenStyle } from "./style";

const BlackScreen = ({ isModalOn, zindex = 200, onClick = () => {} }) => {
  return (
    <BlackScreenStyle onClick={onClick} zindex={zindex} isModalOn={isModalOn} />
  );
};

export default BlackScreen;
