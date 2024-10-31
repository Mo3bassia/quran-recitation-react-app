import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav.js";
import { useClasses } from "./hooks/useClasses.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import AudioPlayer from "./components/AudioPlayer.js";
import RecitersContainer from "./components/RecitersContainer.js";
import SuwarContainer from "./components/SuwarContainer.js";
import axios from "axios";
import Footer from "./icons/Footer.js";
import Overlay from "./components/Overlay.js";

export function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

export function handleDownload(link, title) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(link, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const linkEl = document.createElement("a");
      linkEl.href = url;
      linkEl.setAttribute("download", `${title.trim()}.mp3`);
      document.body.appendChild(linkEl);
      linkEl.click();
      linkEl.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  handleDownload();
}

export function getTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = Math.floor(seconds % 60);
  hours = addZero(hours);
  minutes = addZero(minutes);
  secs = addZero(secs);
  return [secs, minutes, hours];
}

export default function App() {
  const [lang, setLang] = useLocalStorage("eng", "lang");
  const [isDark, setIsDark] = useLocalStorage(false, "isDark");
  const [favourite, setFavourite] = useLocalStorage([], "favourite");
  const [reciters, setReciters] = useLocalStorage([], "reciters");
  const [currentSurah, setCurrentSurah] = useLocalStorage("", "currentSurah");
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
  const audioElement = useRef(null);

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
      return () => {
        document.body.classList.remove("dark");
        document.body.classList.remove("eng");
        document.body.classList.remove("ar");
      };
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
      <Overlay />
      <Nav
        isLoading={isLoading}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        resetAll={resetAll}
        nav={nav}
        goBack={goBack}
        currentReciters={currentReciters}
      />
      {currentReciters && (
        <SuwarContainer
          favourite={favourite}
          setFavourite={setFavourite}
          currentSurahIndex={currentSurahIndex}
          currentReciters={currentReciters}
          navHeight={navHeight}
          lang={lang}
          allSurahs={allSurahs}
          setCurrentSurah={setCurrentSurah}
          setCheck={setCheck}
          setCurrentSurahIndex={setCurrentSurahIndex}
          setPlayingReciter={setPlayingReciter}
          currentSurah={currentSurah}
          playingReciter={playingReciter}
        />
      )}
      <RecitersContainer
        navHeight={navHeight}
        setPlayingReciter={setPlayingReciter}
        setCheck={setCheck}
        setCurrentSurah={setCurrentSurah}
        setCurrentSurahIndex={setCurrentSurahIndex}
        setFavourite={setFavourite}
        allSurahs={allSurahs}
        favourite={favourite}
        lang={lang}
        reciters={reciters}
        searchedItems={searchedItems}
        setSearchedItems={setSearchedItems}
        isLoading={isLoading}
        setCurrentReciters={setCurrentReciters}
      />
      <Footer lang={lang} />
      <AudioPlayer
        currentSurah={currentSurah}
        check={check}
        allSurahs={allSurahs}
        currentSurahIndex={currentSurahIndex}
        playingReciter={playingReciter}
        lang={lang}
        audioElement={audioElement}
      />
      <audio className="none" autoPlay={true} ref={audioElement}></audio>
    </>
  );
}
