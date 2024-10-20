import QuranSvg from "./QuranSvg.js";
export default function Surah({ lang, sura, currentReciters, allSurahs }) {
  return (
    <div
      className="flex gap-5 items-center  hover:text-blue-400 mb-6 dark:border-slate-600 border-b-2 pb-6 justify-between cursor-pointer"
      onClick={() =>
        (new Audio(`${currentReciters.server}${sura}.mp3`).autoplay = "true")
      }
    >
      <p
        className={`${
          lang !== "eng" ? "font-quran text-5xl" : "text-xl lg:text-2xl"
        }`}
        key={sura}
      >
        {lang === "eng" ? (
          <span className="font-bold">
            {+sura}- Sura {allSurahs[+sura - 1]?.name}
          </span>
        ) : (
          <span className="">
            <span className="font-[Montserrat] text-2xl">{+sura} </span>- سورة
            {allSurahs[+sura - 1]?.name}
          </span>
        )}
      </p>
      <QuranSvg />
    </div>
  );
}
