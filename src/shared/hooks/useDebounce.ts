import { useEffect } from "react";
import { useTimeout } from "./useTimeout.ts";

const useDebounce = (
  callback: () => void,
  delay: number | null,
  dependencies: readonly any[]
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};

export default useDebounce;
