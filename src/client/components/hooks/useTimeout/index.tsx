import React from 'react';

const useTimeout = (time = 1) => {
  const timeoutRef = React.useRef<any>();
  const cleanDelays = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const start = (func?: () => void) => {
    cleanDelays();
    timeoutRef.current = setTimeout(() => {
      if (func) func();
    }, time);
  };

  React.useEffect(() => cleanDelays, []);
  return { startTimeout: start, stopTimeout: cleanDelays, timeout: timeoutRef.current };
};

export default useTimeout;
