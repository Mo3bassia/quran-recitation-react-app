import Surah from "./Surah";

export default function SuwarContainer({
  currentReciters,
  navHeight,
  lang,
  allSurahs,
  setCurrentSurah,
  setCheck,
  setCurrentSurahIndex,
  setPlayingReciter,
  currentSurah,
  playingReciter,
}) {
  return (
    <div
      style={{
        height: `calc( 100vh - ${navHeight}px`,
        top: `${navHeight}px`,
      }}
      className={`z-50 fixed overflow-auto left-0 w-full bg-[#F3F4F6] dark:bg-gray-900 text-gray-800 dark:text-gray-50 pb-16 `}
    >
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-8 mb-8">
          {currentReciters.name}
        </h2>
        {currentReciters.surahs.map((sura, index) => (
          <Surah
            key={sura}
            lang={lang}
            sura={sura}
            currentReciters={currentReciters}
            allSurahs={allSurahs}
            setCurrentSurah={setCurrentSurah}
            setCheck={setCheck}
            setCurrentSurahIndex={setCurrentSurahIndex}
            setPlayingReciter={setPlayingReciter}
            currentSurah={currentSurah}
            playingReciter={playingReciter}
          />
        ))}
      </div>
    </div>
  );
}
