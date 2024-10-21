import { useState } from "react";
import QuranSvg from "./QuranSvg.js";
export default function Surah({
  lang,
  sura,
  currentReciters,
  allSurahs,
  setCurrentSurah,
  setCheck,
  setCurrentSurahIndex,
  setPlayingReciter,
}) {
  const link = `${currentReciters.server}${sura}.mp3`;

  function handleClick(e) {
    setCurrentSurahIndex(sura);
    setCurrentSurah(link);
    setCheck(true);
    setPlayingReciter(currentReciters);
  }

  return (
    <div
      className={`flex gap-5 items-center  hover:text-blue-400 mb-6 dark:border-slate-600 border-b-2 pb-6 justify-between cursor-pointer`}
      onClick={(e) => handleClick(e)}
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
      <QuranSvg size={48} />
    </div>
  );
}
