import { createRef, useEffect, useMemo, useState, useCallback } from "react";
import { debounce } from "./utils";
import { Provider } from "./context";
import smoothscroll from "smoothscroll-polyfill";

if (typeof window !== "undefined") {
  smoothscroll.polyfill();
}

export const ScrollingProvider = ({
  debounceDelay = 50,
  scrollBehavior = "smooth",
  offset = 0,
  children,
}) => {
  const [selected, setSelected] = useState("");
  const [sections, setSections] = useState({});

  const handleScroll = useCallback(() => {
    const selectedSection = Object.keys(sections).reduce(
      (acc, id) => {
        const sectionRef = sections[id].ref.current;
        if (!sectionRef) {
          return {
            id,
            differenceFromTop: 0,
          };
        }

        const { top } = sectionRef.getBoundingClientRect();
        const differenceFromTop = Math.abs(top - offset);

        if (differenceFromTop >= acc.differenceFromTop) return acc;

        return {
          id,
          differenceFromTop,
        };
      },
      {
        id: "",
        differenceFromTop: 9999,
      }
    );

    if (selected !== selectedSection.id) setSelected(selectedSection.id);
  }, [sections, selected, offset]);

  const debounceScroll = debounce(handleScroll, debounceDelay);

  useEffect(() => {
    document.addEventListener("scroll", debounceScroll, true);

    handleScroll();

    return () => document.removeEventListener("scroll", debounceScroll, true);
  }, [debounceScroll, handleScroll]);

  const registerRef = useMemo(
    () =>
      ({ id, meta }) => {
        const ref = createRef();
        setSections((prev) => ({ ...prev, [id]: { ref, meta } }));

        return ref;
      },
    []
  );

  const unregisterRef = useMemo(
    () => (id) => {
      setSections(({ [id]: toRemove, ...rest }) => rest);
    },
    []
  );

  const scrollTo = useCallback(
    (id) => {
      const section = sections[id];
      if (!section) return console.warn("Section ID not recognized!"); // eslint-disable-line

      setSelected(id);
      console.log({
        top: section.ref.current.offsetTop + offset,
        behavior: scrollBehavior,
      });
      if (section.ref.current) {
        window.scrollTo({
          top: section.ref.current.offsetTop + offset,
          behavior: scrollBehavior,
        });
      }
    },
    [sections, offset, scrollBehavior]
  );

  const value = useMemo(
    () => ({
      registerRef,
      unregisterRef,
      scrollTo,
      sections,
      selected,
    }),
    [selected, sections, scrollTo, unregisterRef, registerRef]
  );

  return <Provider value={value}>{children}</Provider>;
};
