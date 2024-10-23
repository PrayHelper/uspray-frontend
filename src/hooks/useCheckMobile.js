const useCheckMobile = () => {
  const isMobile = () => {
    const userAgent = navigator.userAgent;
    const checkUserAgent = () => {
      return userAgent.match(
        /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
      );
    };

    return {
      isMobile: !!checkUserAgent(),
      userAgent,
    };
  };

  return {
    isMobile,
  };
};

export default useCheckMobile;
