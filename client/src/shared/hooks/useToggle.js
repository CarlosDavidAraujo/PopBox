import { useState } from "react";

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((prevState) => !prevState);

  const setOff = () => setState(false);

  const setOn = () => setState(true);

  return { state, toggle, setOn, setOff };
};
