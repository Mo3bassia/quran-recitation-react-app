import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav.js";
import { useClasses } from "./hooks/useClasses.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import SearchInput from "./components/SearchInput.js";
import NumberOfReciters from "./components/NumberOfReciters.js";
import LoaderPost from "./components/LoaderPost.js";
import Reciter from "./components/Reciter.js";
import NotFound from "./components/NotFound.js";
import Surah from "./components/Surah.js";
import AudioPlayer from "./components/AudioPlayer.js";

export default function App() {
  const [lang, setLang] = useLocalStorage("eng", "lang");
  const [isDark, setIsDark] = useLocalStorage(false, "isDark");
  const [reciters, setReciters] = useLocalStorage([], "reciters");
  const [currentSurah, setCurrentSurah] = useLocalStorage("", "currentSurah");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [navHeight, setNavHeight] = useState(0);
  const [check, setCheck] = useState(false);
  const [currentSurahIndex, setCurrentSurahIndex] = useLocalStorage(
    "",
    "currentSurahIndex"
  );
  const [allSurahs, setAllSurahs] = useLocalStorage([], "allSurahs");
  const [currentReciters, setCurrentReciters] = useLocalStorage(
    "",
    "currentReciters"
  );
  const [playingReciter, setPlayingReciter] = useLocalStorage(
    "",
    "playingReciter"
  );
  const nav = useRef(null);

  const checkSearchedEmpty = searchedItems.length === 0;

  useEffect(
    function () {
      if (currentReciters) document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "auto");
    },
    [currentReciters]
  );

  useEffect(
    function () {
      if (reciters.length !== 0 && allSurahs.length !== 0) return;
      async function getReciters() {
        setIsLoading(true);
        const response = await fetch(
          `https://www.mp3quran.net/api/v3/reciters?language=${lang}`
        );
        const data = await response.json();
        setReciters(data.reciters);

        if (
          data.reciters.filter((reciter) => reciter.id === playingReciter.id)[0]
        )
          setPlayingReciter(
            data.reciters.filter(
              (reciter) => reciter.id === playingReciter.id
            )[0]
          );
        // console.log(
        //   data.reciters.filter(
        //     (reciter, index) => reciters.id === playingReciter.id
        //   )[0].id
        // );
        // setPlayingReciter(
        //   data.reciters[
        //     data.reciters.filter(
        //       (reciter, index) => reciters.id === playingReciter.id
        //     )[0].id - 1
        //   ]
        // );

        const responseForSurahs = await fetch(
          `https://www.mp3quran.net/api/v3/suwar?language=${lang}`
        );
        const suras = await responseForSurahs.json();
        setAllSurahs(suras.suwar);
        setIsLoading(false);
      }
      getReciters();
    },
    [lang]
  );

  function resetAll() {
    setReciters([]);
    setSearchedItems([]);
    setAllSurahs([]);
    setCurrentReciters("");
    // console.log(
    //   reciters[
    //     reciters.filter((reciter, index) => reciter.id === playingReciter.id)[0]
    //       .id - 1
    //   ].name
    // );
  }

  function goBack() {
    setCurrentReciters("");
  }

  useClasses(
    document.body,
    "text-slate-800",
    "dark:text-slate-200",
    "ltr:font-[Montserrat]",
    "rtl:font-noto-arabic"
  );

  useEffect(function () {
    if (lang === "eng") {
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

  useEffect(
    function () {
      setNavHeight(nav.current.clientHeight);
    },
    [nav]
  );
  return (
    <>
      <Nav
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        setReciters={setReciters}
        resetAll={resetAll}
        nav={nav}
        goBack={goBack}
        currentReciters={currentReciters}
      />
      {currentReciters && (
        <div
          style={{
            height: `calc( 100vh - ${navHeight}px`,
            top: `${navHeight}px`,
          }}
          className={`z-50 fixed overflow-auto left-0 w-full bg-[#F3F4F6] dark:bg-gray-900 text-gray-800 dark:text-gray-50 `}
        >
          <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-8 mb-8">
              {currentReciters.name}
            </h2>
            {currentReciters.surahs.map((sura, index) => (
              <Surah
                lang={lang}
                sura={sura}
                currentReciters={currentReciters}
                allSurahs={allSurahs}
                key={sura}
                setCurrentSurah={setCurrentSurah}
                setCheck={setCheck}
                setCurrentSurahIndex={setCurrentSurahIndex}
                setPlayingReciter={setPlayingReciter}
              />
            ))}
          </div>
        </div>
      )}
      <div
        className={`min-h-screen bg-[#F3F4F6] dark:bg-gray-900 text-gray-800 dark:text-gray-50 `}
      >
        <div className={`container mx-auto p-4 pt-6 md:p-6 lg:p-12`}>
          <NumberOfReciters lang={lang} reciters={reciters} />
          <SearchInput
            lang={lang}
            query={query}
            setQuery={setQuery}
            searchedItems={searchedItems}
            setSearchedItems={setSearchedItems}
            reciters={reciters}
            checkSearchedEmpty={checkSearchedEmpty}
            isLoading={isLoading}
          />
          {isLoading ? (
            <div className="flex justify-center items-center gap-5 flex-wrap">
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
              <LoaderPost />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {searchedItems.length === 0 && query !== "" ? (
                <NotFound />
              ) : searchedItems.length === 0 && query === "" ? (
                reciters
                  ?.sort((a, b) => +a.id - +b.id)
                  .map((reciter, index) => (
                    <Reciter
                      reciter={reciter}
                      key={index}
                      index={index}
                      setCurrentReciters={setCurrentReciters}
                    />
                  ))
              ) : (
                searchedItems
                  ?.sort((a, b) => +a.id - +b.id)
                  .map((reciter, index) => (
                    <Reciter
                      reciter={reciter}
                      key={index}
                      index={index}
                      setCurrentReciters={setCurrentReciters}
                    />
                  ))
              )}
            </div>
          )}
        </div>
      </div>
      <AudioPlayer
        currentSurah={currentSurah}
        check={check}
        allSurahs={allSurahs}
        currentSurahIndex={currentSurahIndex}
        playingReciter={playingReciter}
        lang={lang}
      />
    </>
  );
}
