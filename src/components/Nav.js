import ToggleBtn from "./ToggleBtn.js";

export default function Nav({ setIsDark, lang, setLang }) {
  return (
    <nav
      className={`bg-slate-100 text-slate-800  dark:bg-slate-800 dark:text-slate-100 ${
        lang === "en" ? "font-[Montserrat]" : "font"
      }`}
    >
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            {lang === "en" ? "Quran Recitation" : "صوت القرآن"}
          </div>
          <div className="flex items-center gap-2">
            <select
              className="bg-white border border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="ar">AR</option>
              <option value="en">EN</option>
            </select>

            <ToggleBtn setIsDark={setIsDark} />
          </div>
        </div>
      </div>
    </nav>
  );
}
