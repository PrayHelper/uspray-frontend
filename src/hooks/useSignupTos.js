import { useState } from "react";

const ids = ["tos1", "tos2", "tos3"];

const getStateOf = (value) => {
  const ret = {};
  ids.forEach((id) => {
    ret[id] = value;
  });
  return ret;
};

const useSignupTos = () => {
  const [isAgreed, setIsAgreed] = useState(getStateOf(false));

  const toggleAll = () => {
    const agreedAtLeast1 = ids.some((id) => isAgreed[id]);
    if (agreedAtLeast1) setIsAgreed(getStateOf(false));
    else setIsAgreed(getStateOf(true));
  };

  const toggleHandler = (event) => {
    const { id } = event.target;

    setIsAgreed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isAgreedAll = ids.every((id) => isAgreed[id]);

  return { isAgreed, isAgreedAll, toggleAll, toggleHandler };
};

export default useSignupTos;
