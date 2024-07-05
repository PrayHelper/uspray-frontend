const useCheckMobile = () => {
  const isMobile = () => {
    const checkUserAgent = () => {
      return navigator.userAgent.match(
        /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
      );
    };

    if (checkUserAgent()) {
      return true;
    } else {
      return false;
    }
  };

  return {
    isMobile,
  };
};

export default useCheckMobile;
