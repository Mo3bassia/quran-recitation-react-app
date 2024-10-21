import ToggleBtn from "./ToggleBtn.js";
import ReturnBtn from "./ReturnBtn.js";

export default function Nav({
  setIsDark,
  lang,
  setLang,
  setReciters,
  resetAll,
  nav,
  currentReciters,
  goBack,
}) {
  function handleSelect(e) {
    setLang(e.target.value);
    resetAll();
  }
  return (
    <nav
      ref={nav}
      className={`sticky top-0 z-50 bg-[#E5E7EB]  dark:bg-gray-800 dark:text-slate-100 text-gray-800`}
    >
      <div className="container mx-auto py-6 px-3 sm:px-4 md:px-5">
        <div className="flex justify-between items-center">
          <a
            className=" font-bold text-xl sm:text-xl md:text-2xl lg:text-4xl"
            href="#"
          >
            {lang === "eng" ? "Quran Recitation" : "صوت القرآن"}
          </a>
          <div className="flex items-center gap-2">
            <select
              className="bg-[#FFFFFF] border border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              value={lang}
              onChange={(e) => handleSelect(e)}
            >
              <option value="ar">AR</option>
              <option value="eng">EN</option>
            </select>

            <ToggleBtn setIsDark={setIsDark} />
            {currentReciters && <ReturnBtn goBack={goBack} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
