// React 18 이상 버전에서 StrictMode와 react-beautiful-dnd를 함께 사용하기 위해 필요한 컴포넌트
// Reference: https://github.com/atlassian/react-beautiful-dnd/issues/2399

import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;
