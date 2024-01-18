import { useNotification } from "../../hooks/useNotification";
import { Toggle, ToggleButton, ToggleWrap } from "./style";

const SettingToggle = ({id, isAbledData}) => {
  const { setNotification } = useNotification();

  const enableNotify = async () => {
    setNotification({
      notificationType: `${id}`,
      agree: true
    })
  };

  const disableNotify = async () => {
    setNotification({
      notificationType: `${id}`,
      agree: false
    })
  };

  return (
    <ToggleWrap
      onClick={() => (isAbledData ? disableNotify() : enableNotify())}
    >
      <Toggle isToggleOn={isAbledData}>
        <ToggleButton isToggleOn={isAbledData}></ToggleButton>
      </Toggle>
    </ToggleWrap>
  );
};

export default SettingToggle;
