import { useEffect, useState } from "react";
import QuranSvg from "./QuranSvg.js";
import RangeInput from "./RangeInput.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function AudioPlayer({
  currentSurah,
  check,
  currentSurahIndex,
  playingReciter,
  allSurahs,
  lang,
}) {
  const [volume, setVolume] = useLocalStorage(100, "volume");
  const [audioValue, setAudioValue] = useLocalStorage(100, "audioValue");

  function handleChangeVolume(e) {
    setVolume(e.target.value);
    const max = e.target.max;
    const percentage = (e.target.value / max) * 100;
    e.target.style.setProperty("--value", `${percentage}%`);
  }
  function handleChangeAudio(e) {
    setAudioValue(e.target.value);
    const max = e.target.max;
    const percentage = (e.target.value / max) * 100;
    e.target.style.setProperty("--value", `${percentage}%`);
  }
  useEffect(
    function () {
      let audio = new Audio(currentSurah);
      console.log(currentSurah);
      if ((currentSurah, check)) {
        // console.log(currentSurah);
        audio.preload = "true";
        audio.autoplay = "true";
        audio.play();
      } else if (currentSurah && !check) {
        // console.log(playingReciter);
      }
      audio.onplay = function () {
        // console.log(currentSurahIndex);
      };

      return () => {
        audio.pause();
        audio = null;
      };
    },
    [currentSurah, check, playingReciter.id]
  );
  return (
    <>
      <div className="flex items-center fixed w-full bottom-0 bg-[#E5E7EB]  dark:bg-gray-800 dark:text-slate-100 text-gray-800 p-5 gap-5 z-[9999]">
        <div className="flex gap-5 items-center min-w-56">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-400 ">
            <QuranSvg size={24} />
          </div>
          <div>
            {lang === "eng" ? (
              <>
                <p className="dark:text-slate-200 text-gray-900 font-bold">
                  Sura {allSurahs[+currentSurahIndex - 1]?.name}
                </p>
                <p className="dark:text-slate-400 text-gray-500">
                  {playingReciter.name}
                </p>
              </>
            ) : (
              <>
                <p>سورة {allSurahs[+currentSurahIndex - 1]?.name}</p>
                <p className="dark:text-slate-400 text-gray-500">
                  {playingReciter.name}
                </p>
              </>
            )}
          </div>
        </div>
        <span className="">00:00</span>
        <RangeInput
          max={100}
          min={0}
          value={audioValue}
          onChange={handleChangeAudio}
          height={15}
        />

        <span>18:00</span>
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
          <RangeInput
            max={100}
            min={0}
            value={volume}
            onChange={handleChangeVolume}
            height={10}
          />
        </div>
      </div>
    </>
  );
}
