import { useEffect, useRef, useState } from "react";
import QuranSvg from "./QuranSvg.js";
import RangeInput from "./RangeInput.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import PlayIcon from "../icons/PlayIcon.js";
import PauseIcon from "../icons/PauseIcon.js";
import FullscreenIcon from "../icons/FullscreenIcon.js";
import ExitFullscreenIcon from "../icons/ExitFullscreenIcon.js";
import { getTime } from "../App.js";

export default function AudioPlayer({
  currentSurah,
  check,
  currentSurahIndex,
  playingReciter,
  allSurahs,
  lang,
  audioElement,
  isDark,
}) {
  const [volume, setVolume] = useLocalStorage(100, "volume");
  const [audioValue, setAudioValue] = useLocalStorage(100, "audioValue");
  const [currentPercent, setCurrentPercent] = useLocalStorage(
    0,
    "currentPercent",
  );
  const [currentDuraion, setCurrentDuraion] = useLocalStorage(
    0,
    "currentDuration",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pauseAndPlay = useRef(null);

  function handlePlaying() {
    handleToggle();
    audioElement.current.play();
  }
  function handlePausing() {
    handleToggle();
    audioElement.current.pause();
  }

  function handleToggle() {
    setIsPlaying((is) => !is);
  }

  audioElement.current?.addEventListener("volumechange", function () {
    if (!check) setVolume(audioElement.current.volume * 100);
  });

  audioElement.current?.addEventListener("timeupdate", function () {
    const currentTime = audioElement.current.currentTime;
    setCurrentPercent(
      (audioElement.current.currentTime / audioElement.current.duration) * 100,
    );
    setAudioValue(currentTime);
    setCurrentDuraion(audioElement.current.duration);
  });

  function handleChangeVolume(e) {
    audioElement.current.volume = e.target.value / 100;
    if (!check) {
      audioElement.current.play();
      setIsPlaying(true);
    }
  }
  function handleChangeAudio(e) {
    audioElement.current.play();
    setIsPlaying(true);
    setAudioValue(getTime(e.target.value));
    audioElement.current.currentTime = e.target.value;
    const max = e.target.max;
    const percentage = (e.target.value / max) * 100;
    e.target.style.setProperty("--value", `${percentage}%`);
  }
  useEffect(
    function () {
      if ((currentSurah, check)) {
        audioElement.current.volume = volume / 100;
        audioElement.current.preload = "true";
        audioElement.current.autoplay = "true";
        audioElement.current.src = currentSurah;
        setIsPlaying(true);
        audioElement.current.play();
      } else if (currentSurah && !check) {
        audioElement.current.src = currentSurah;
        audioElement.current.currentTime = audioValue;
        audioElement.current.volume = volume / 100;
      }
      audioElement.current.onplay = function () {
        setIsPlaying(true);
      };
    },
    [currentSurah, check, playingReciter.id, pauseAndPlay.current],
  );
  let [secondsCurrent, minutesCurrent, hoursCurrent] = getTime(audioValue);
  let [secondsDuration, minutesDuration, hoursDuration] =
    getTime(currentDuraion);

  function setVolumeSound(vol) {
    setVolume(vol);
    audioElement.current.volume = vol / 100;
  }

  function toggleFullscreen() {
    setIsFullscreen(!isFullscreen);
  }

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  return (
    <>
      {/* Fullscreen Mode */}
      {isFullscreen && (
        <div
          className={`fixed inset-0 z-[99999] flex items-center justify-center animate-fadeIn ${
            isDark
              ? "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950"
              : "bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50"
          }`}
        >
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
                isDark ? "bg-blue-500/10" : "bg-blue-300/20"
              }`}
            ></div>
            <div
              className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
                isDark ? "bg-indigo-500/10" : "bg-indigo-300/20"
              }`}
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Close Button */}
          <button
            onClick={toggleFullscreen}
            className={`absolute top-8 right-8 z-50 p-3 rounded-xl backdrop-blur-md transition-all duration-300 border ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-900"
            }`}
          >
            <ExitFullscreenIcon className="size-6" />
          </button>

          {/* Main Content Container */}
          <div className="relative z-10 w-full max-w-2xl px-8">
            {/* Quran Icon */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${
                    isDark
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                      : "bg-gradient-to-r from-blue-400 to-sky-400"
                  }`}
                ></div>
                <div
                  className={`relative w-28 h-28 flex items-center justify-center backdrop-blur-xl rounded-3xl border shadow-2xl ${
                    isDark
                      ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-white/20"
                      : "bg-gradient-to-br from-blue-400/30 to-sky-400/30 border-blue-300/50"
                  }`}
                >
                  <QuranSvg size={56} />
                </div>
              </div>
            </div>

            {/* Surah Name */}
            <div className="text-center mb-3">
              <h1
                className={`text-5xl md:text-6xl font-bold mb-2 tracking-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {lang === "eng"
                  ? `Surah ${allSurahs[+currentSurahIndex - 1]?.name}`
                  : `سورة ${allSurahs[+currentSurahIndex - 1]?.name}`}
              </h1>
            </div>

            {/* Reciter Name */}
            <div className="text-center mb-12">
              <p
                className={`text-xl font-light ${
                  isDark ? "text-blue-200/80" : "text-blue-600/80"
                }`}
              >
                {playingReciter.name}
              </p>
            </div>

            {/* Time and Progress Container */}
            <div
              className={`backdrop-blur-xl rounded-2xl p-6 border shadow-2xl mb-8 ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-white/40"
              }`}
            >
              {/* Time Display */}
              <div
                className={`flex justify-between items-center mb-4 font-[Montserrat] text-base ${
                  isDark ? "text-white/90" : "text-gray-900"
                }`}
              >
                <span className="font-medium">
                  {hoursCurrent === "00" && hoursDuration === "00"
                    ? `${minutesCurrent}:${secondsCurrent}`
                    : `${hoursCurrent}:${minutesCurrent}:${secondsCurrent}`}
                </span>
                <span
                  className={`text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}
                >
                  {hoursCurrent === "00" && hoursDuration === "00"
                    ? `${minutesDuration}:${secondsDuration}`
                    : `${hoursDuration}:${minutesDuration}:${secondsDuration}`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <input
                  type="range"
                  max={
                    audioElement.current?.duration
                      ? audioElement.current?.duration
                      : 0
                  }
                  min={0}
                  value={
                    audioElement.current?.currentTime
                      ? audioElement.current?.currentTime
                      : 0
                  }
                  onChange={(e) => {
                    audioElement.current.currentTime = e.target.value;
                    const max = e.target.max;
                    const percentage = (e.target.value / max) * 100;
                    e.target.style.setProperty("--value", `${percentage}%`);
                    if (!isPlaying) {
                      audioElement.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  style={{
                    height: 8,
                    "--value": `${currentPercent}%`,
                  }}
                  className={`${isDark ? "fullscreen-progress-dark" : "fullscreen-progress-light"} w-full appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:border-2 hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform ${
                    isDark
                      ? "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-blue-400"
                      : "[&::-webkit-slider-thumb]:bg-rose-600 [&::-webkit-slider-thumb]:border-rose-300"
                  } ${lang === "ar" ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-6">
              {/* Volume Control */}
              <div className="relative group">
                <button
                  onClick={() => setVolumeSound(volume === 0 ? 100 : 0)}
                  className={`p-4 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                      : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-900"
                  }`}
                >
                  {volume !== 0 ? (
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
                  ) : (
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
                        d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                      />
                    </svg>
                  )}
                </button>
                {/* Volume Bars - Show on Hover - Redesigned */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div
                    className={`backdrop-blur-xl rounded-2xl px-3 py-6 border shadow-2xl ${
                      isDark
                        ? "bg-white/10 border-white/20"
                        : "bg-white/80 border-white/40"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      {/* Volume Percentage */}
                      <span
                        className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {volume}%
                      </span>
                      {/* Vertical Volume Bars */}
                      <div className="flex flex-col-reverse gap-1 h-32">
                        {[...Array(10)].map((_, i) => {
                          const barValue = (i + 1) * 10;
                          const isActive = volume >= barValue;
                          return (
                            <div
                              key={i}
                              onClick={() => {
                                setVolume(barValue);
                                audioElement.current.volume = barValue / 100;
                              }}
                              className={`w-8 h-2.5 rounded-full cursor-pointer transition-all duration-200 ${
                                isActive
                                  ? isDark
                                    ? "bg-blue-500 hover:bg-blue-400"
                                    : "bg-rose-500 hover:bg-rose-600"
                                  : isDark
                                    ? "bg-white/20 hover:bg-white/30"
                                    : "bg-gray-300 hover:bg-gray-400"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={isPlaying ? handlePausing : handlePlaying}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {!isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Forward 10s Button */}
              <button
                onClick={() => {
                  if (audioElement.current) {
                    audioElement.current.currentTime = Math.min(
                      audioElement.current.currentTime + 10,
                      audioElement.current.duration,
                    );
                  }
                }}
                className={`p-4 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Normal Player */}
      <div className=" sticky w-full bottom-0 bg-[#E5E7EB]  dark:bg-gray-800 dark:text-slate-100 text-gray-800 md:px-5 px-2  py-5 z-[9999]">
        <div className="container mx-auto flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {!isPlaying ? (
            <PlayIcon onClick={() => handlePlaying()} />
          ) : (
            <PauseIcon onClick={() => handlePausing()} />
          )}
          <div className="flex gap-5 items-center sm:min-w-24 md:min-w-36 lg:min-w-56">
            <div className="rounded-full w-12 h-12  items-center justify-center bg-blue-400 hidden lg:flex ">
              <QuranSvg size={24} />
            </div>
            <div>
              {lang === "eng" ? (
                <>
                  <p className="dark:text-slate-200 text-gray-900 font-bold text-sm md:text-base flex gap-1">
                    <span className="hidden md:block">Sura</span>{" "}
                    {allSurahs[+currentSurahIndex - 1]?.name}
                  </p>
                  <p className="dark:text-slate-400 text-gray-500 text-sm md:text-base">
                    {playingReciter.name}
                  </p>
                </>
              ) : (
                <>
                  <p
                    sura={`sura-${allSurahs[+currentSurahIndex - 1]?.id}`}
                    className="flex gap-1"
                  >
                    <span className="hidden md:block">سورة</span>{" "}
                    {allSurahs[+currentSurahIndex - 1]?.name}
                  </p>
                  <p className="dark:text-slate-400 text-gray-500">
                    {playingReciter.name}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="relative w-full flex gap-1 md:gap-2 lg:gap-3 items-center">
            <div
              className={`absolute md:hidden text-[14px]  text-sm p-2 rounded-lg pointer-events-none text-slate-100 font-bold z-[99999] `}
              style={{
                left: lang === "eng" && 0,
                right: lang !== "eng" && 0,
              }}
            >
              <div className=" font-[Montserrat]">
                <span className="">
                  {hoursCurrent === "00" && hoursDuration === "00"
                    ? `${minutesCurrent}:${secondsCurrent}`
                    : `${hoursCurrent}:${minutesCurrent}:${secondsCurrent}`}
                </span>
                <span> / </span>
                <span>
                  {hoursCurrent === "00" && hoursDuration === "00"
                    ? `${minutesDuration}:${secondsDuration}`
                    : `${hoursDuration}:${minutesDuration}:${secondsDuration}`}
                </span>
              </div>
            </div>
            <div className="hidden gap-1 md:gap-2 lg:gap-3 font-[Montserrat] md:flex">
              <span className="">
                {hoursCurrent === "00" && hoursDuration === "00"
                  ? `${minutesCurrent}:${secondsCurrent}`
                  : `${hoursCurrent}:${minutesCurrent}:${secondsCurrent}`}
              </span>
              <span> / </span>
              <span>
                {hoursCurrent === "00" && hoursDuration === "00"
                  ? `${minutesDuration}:${secondsDuration}`
                  : `${hoursDuration}:${minutesDuration}:${secondsDuration}`}
              </span>
            </div>
            <RangeInput
              max={
                audioElement.current?.duration
                  ? audioElement.current?.duration
                  : 0
              }
              min={0}
              value={
                audioElement.current?.currentTime
                  ? audioElement.current?.currentTime
                  : 0
              }
              onChange={(e) => handleChangeAudio(e)}
              height={19}
              className={`w-full ${lang === "ar" ? "rotate-180" : ""} `}
              currentPercent={currentPercent}
              disabled={!isPlaying ? true : ""}
            />
          </div>
          <div className="flex items-center gap-4 relative group">
            {volume !== 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 md:size-6 cursor-pointer my-4  md:my-3 "
                onClick={() => setVolumeSound(0)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 md:size-6 cursor-pointer my-4  md:my-3 "
                onClick={() => setVolumeSound(100)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}
            <RangeInput
              lang={lang}
              max={100}
              min={0}
              value={volume}
              onChange={handleChangeVolume}
              height={16}
              currentPercent={volume}
              className="absolute hidden left-[-20px] w-16 -rotate-90 -translate-y-14 group-hover:block"
            />
          </div>
          {/* Fullscreen Button */}
          <div className="hidden md:block">
            <FullscreenIcon onClick={toggleFullscreen} />
          </div>
        </div>
      </div>
    </>
  );
}
