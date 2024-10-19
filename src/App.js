import { useEffect, useState } from "react";
import Nav from "./components/Nav.js";
import { useClasses } from "./hooks/useClasses.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import SearchInput from "./components/SearchInput.js";

export default function App() {
  const [lang, setLang] = useLocalStorage("en");
  const [isDark, setIsDark] = useLocalStorage(false);
  const [reciters, setReciters] = useState([]);

  useClasses(
    document.body,
    "text-slate-800",
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
      <div
        className={`min-h-screen bg-[#F3F4F6] dark:bg-gray-900 text-gray-800 dark:text-gray-100`}
      >
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12  ">
          <h2 className="mt-9 text-2xl md:text-3xl lg:text-4xl font-bold">
            {lang === "en" ? (
              <span>
                Number of Quran reciters is
                <span className="bg-[#E5E7EB] dark:bg-gray-800 px-2 py-1.5 rounded-md mx-1.5">
                  {reciters.length}
                </span>
                {reciters.length > 1 ? "reciters" : "reciter"}
              </span>
            ) : (
              <span>
                عدد القرآء هو
                <span className="bg-[#E5E7EB] dark:bg-gray-800 px-2  rounded-md mx-1.5">
                  {reciters.length}
                </span>
                {reciters.length > 1 ? "قراء" : "قارئ"}
              </span>
            )}
          </h2>
          <SearchInput lang={lang} />
        </div>
      </div>
    </>
  );
}
