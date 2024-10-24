import { handleDownload } from "../App";
import DownloadIcon from "./DownloadIcon.js";

export default function Surah({
  lang,
  sura,
  currentReciters,
  allSurahs,
  setCurrentSurah,
  setCheck,
  setCurrentSurahIndex,
  setPlayingReciter,
  setFavourite,
  favourite,
  currentSurahIndex,
  playingReciter,
  suraIn,
}) {
  const link = `${currentReciters.server}${
    suraIn.id < 10
      ? `00${suraIn.id}`
      : suraIn.id >= 10 && suraIn.id < 100
      ? `0${suraIn.id}`
      : suraIn.id || sura
  }.mp3`;

  function handleClick(e) {
    setCurrentSurahIndex(sura);
    setCurrentSurah(link);
    setCheck(true);
    setPlayingReciter(currentReciters);
  }

  function handleFavourite() {
    setFavourite(
      favourite.filter(
        (suraFav) =>
          currentReciters.name === suraFav.reciter && +sura === suraFav.sura
      ).length === 0
        ? [
            ...favourite,
            {
              sura: +sura,
              reciter: currentReciters.name,
              reciterId: currentReciters.id,
              currentReciter: currentReciters,
            },
          ]
        : favourite.filter((f) => {
            return !(f.sura === +sura && f.reciter === currentReciters.name);
          })
    );
  }

  const checkActive = favourite.filter(
    (suraFav) =>
      currentReciters.name === suraFav.reciter && +sura === suraFav.sura
  ).length;

  return (
    <div
      className={`flex gap-5 items-center   mb-6 dark:border-slate-600 border-b-2 pb-6 justify-between cursor-pointer`}
    >
      <p
        className={`${
          lang !== "eng" ? "font-quran text-5xl" : "text-xl lg:text-2xl"
        } flex-grow hover:text-blue-400 ${
          currentSurahIndex === sura &&
          playingReciter.name === currentReciters.name
            ? "text-blue-400"
            : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        {lang === "eng" ? (
          <span className="font-bold">
            {+sura}- Sura {allSurahs[+sura - 1]?.name}
          </span>
        ) : (
          <span className="">
            <span className="font-[Montserrat] text-2xl">{+sura} </span>- سورة{" "}
            {allSurahs[+sura - 1]?.name}
          </span>
        )}
      </p>
      <DownloadIcon
        link={`${currentReciters.server}${sura}.mp3`}
        title={
          lang === "eng"
            ? `Sura ${allSurahs[+sura - 1].name} - ${currentReciters.name}`
            : `سورة ${allSurahs[+sura - 1].name} - ${currentReciters.name}`
        }
        currentReciters={currentReciters}
        sura={sura}
        allSurahs={allSurahs}
        lang={lang}
      />
      <svg
        onClick={handleFavourite}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-6 hover:text-red-600 hover:fill-red-600 ${
          checkActive ? "text-red-600 fill-red-600" : ""
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
}
