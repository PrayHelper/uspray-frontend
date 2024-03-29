import { useMemo, useContext, useEffect, useRef } from "react";
import { ScrollContext } from "./context";

export const Section = ({ id, children, meta, ...rest }) => {
  const { registerRef, unregisterRef } = useContext(ScrollContext);
  const ref = useMemo(() => registerRef({ id, meta }), [id, meta, registerRef]);
  const firstCalled = useRef(false);

  useEffect(() => {
    // StrictMode 대응을 위한 trick
    setTimeout(() => {
      firstCalled.current = true;
    });

    return function () {
      if (firstCalled.current) unregisterRef(id);
    };
  }, [unregisterRef, id]);

  return (
    <section {...rest} ref={ref} id={id}>
      {children}
    </section>
  );
};
