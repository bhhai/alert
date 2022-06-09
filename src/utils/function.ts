import { useEffect, useRef, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const Function = {
  useOnClickOutside: (ref, handler, classList: string[]) => {
    const listener = (event) => {
      // Fix path in safari
      if (!("path" in Event.prototype)) {
        Object.defineProperty(Event.prototype, "path", {
          get: function () {
            const path = [];
            let currentElem = this.target;
            while (currentElem) {
              path.push(currentElem);
              currentElem = currentElem.parentElement;
            }
            if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
            if (path.indexOf(window) === -1) path.push(window);
            return path;
          },
        });
      }
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.composedPath().filter((i) => i.classList && classList.some((clas) => i.classList.contains(clas))).length === 0
      ) {
        handler(event);
        return;
      }
      return;
    };
    useEffect(() => {
      window.addEventListener("mousedown", listener, false);
      return () => {
        window.removeEventListener("mousedown", listener, false);
      };
    }, [ref, handler]);
  },
  useDebounce: (value, delay = 470, callback = (f) => f) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        callback(null);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  },
  useInterval: (callback, delay) => {
    const savedCallback = useRef<any>();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        if (savedCallback) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  },
  useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  },
};
export default Function;
