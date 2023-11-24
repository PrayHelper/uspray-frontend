import { BlackScreenStyle } from "./style";

const BlackScreen = ({ isModalOn, zindex = 200 }) => {
  return <BlackScreenStyle zindex={zindex} isModalOn={isModalOn} />;
};

export default BlackScreen;
