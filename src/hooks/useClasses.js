import { useEffect } from "react";

export function useClasses(el, ...classes) {
  useEffect(function () {
    classes?.map((cls) => {
      el.classList.add(cls);
    });
  }, []);
}
