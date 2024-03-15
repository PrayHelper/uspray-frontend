import { BlackScreenStyle } from "./style";

const BlackScreen = ({ isModalOn, zindex = 200, onAnimationEnd }) => {
  return (
    <BlackScreenStyle
      zindex={zindex}
      isModalOn={isModalOn}
      onAnimationEnd={onAnimationEnd}
    />
  );
};

export default BlackScreen;
