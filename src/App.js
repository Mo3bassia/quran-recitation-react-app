import { useEffect, useState } from "react";
import Nav from "./components/Nav.js";
import { useClasses } from "./hooks/useClasses.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

export default function App() {
  const [lang, setLang] = useLocalStorage("en");
  const [isDark, setIsDark] = useLocalStorage(false);

  useClasses(
    document.body,
    "bg-white",
    "text-slate-800",
    "dark:bg-slate-700",
    "dark:text-slate-200",
    "ltr:font-[Montserrat]",
    "rtl:font-noto-arabic"
  );

  useEffect(function () {
    if (lang === "en") {
      document.documentElement.setAttribute("dir", "ltr");
    } else {
      document.documentElement.setAttribute("dir", "rtl");
    }
  });

  useEffect(
    function () {
      document.body.classList.add(lang);
      isDark && document.body.classList.add("dark");
      return () => document.body.classList.remove("dark");
    },
    [lang, isDark]
  );

  return (
    <>
      <Nav setIsDark={setIsDark} lang={lang} setLang={setLang} />
    </>
  );
}
