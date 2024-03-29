import { createContext } from "react";

const DEFAULT_CONTEXT = {
  registerRef: () => null,
  unregisterRef: () => {},
  scrollTo: () => {},
  sections: {},
  selected: "",
};

export const ScrollContext = createContext(DEFAULT_CONTEXT);

export const { Consumer, Provider } = ScrollContext;
