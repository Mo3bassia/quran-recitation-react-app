import Surah from "./Surah";
import SearchSura from "./SearchSura.js";
import { useState } from "react";
import Overlay from "./Overlay.js";

export default function SuwarContainer({
  currentReciters,
  favourite,
  setFavourite,
  navHeight,
  lang,
  allSurahs,
  setCurrentSurah,
  setCheck,
  setCurrentSurahIndex,
  setPlayingReciter,
  currentSurah,
  playingReciter,
  currentSurahIndex,
}) {
  const [query, setQuery] = useState("");
  const [findSurahs, setFindSurahs] = useState(
    currentReciters.surahs
      .map((sura) => {
        return { ...allSurahs[+sura - 1] };
      })
      .map((surah, index) => {
        if (lang === "eng") surah.name = `sura ${surah.name}`;
        else surah.name = `سورة ${surah.name}`;
        return surah;
      })
  );

  return (
    <div
      style={{
        height: `calc( 100vh - ${navHeight}px`,
        top: `${navHeight}px`,
      }}
      className={`z-50 fixed overflow-auto left-0 w-full bg-[#F3F4F6] dark:bg-gray-900 text-gray-800 dark:text-gray-50 pb-16 `}
    >
      <Overlay />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
          {currentReciters.name}
        </h2>
        <SearchSura
          query={query}
          setQuery={setQuery}
          lang={lang}
          currentReciters={currentReciters}
          allSurahs={allSurahs}
          findSurahs={findSurahs}
          setFindSurahs={setFindSurahs}
        />
        {findSurahs.length == currentReciters.surahs.length
          ? currentReciters.surahs.map((sura, index) => (
              <Surah
                favourite={favourite}
                setFavourite={setFavourite}
                key={sura}
                lang={lang}
                sura={sura}
                suraIn={sura}
                currentReciters={currentReciters}
                allSurahs={allSurahs}
                setCurrentSurah={setCurrentSurah}
                setCheck={setCheck}
                setCurrentSurahIndex={setCurrentSurahIndex}
                setPlayingReciter={setPlayingReciter}
                currentSurah={currentSurah}
                playingReciter={playingReciter}
                currentSurahIndex={currentSurahIndex}
              />
            ))
          : findSurahs.map((sura, index) => (
              <Surah
                favourite={favourite}
                setFavourite={setFavourite}
                key={sura.id}
                lang={lang}
                sura={sura.id}
                suraIn={sura}
                currentReciters={currentReciters}
                allSurahs={allSurahs}
                setCurrentSurah={setCurrentSurah}
                setCheck={setCheck}
                setCurrentSurahIndex={setCurrentSurahIndex}
                setPlayingReciter={setPlayingReciter}
                currentSurah={currentSurah}
                playingReciter={playingReciter}
                currentSurahIndex={currentSurahIndex}
              />
            ))}
      </div>
    </div>
  );
}
