import { useEffect, useState } from "react";
import DownloadIcon from "./DownloadIcon";
import OpenListIcon from "./OpenListIcon.js";
import CloseListIcon from "./CloseListIcon.js";

export default function FavouriteSurahs({
  lang,
  favourite,
  allSurahs,
  setFavourite,
  setCurrentSurahIndex,
  setCurrentSurah,
  setCheck,
  setPlayingReciter,
  reciters,
}) {
  const [isFavOpened, setIsFavOpened] = useState(false);

  function handleRemove(favItem) {
    setFavourite(
      favourite.filter(
        (fav) =>
          !(
            fav.sura === favItem.sura &&
            fav.reciter === favItem.reciter &&
            fav.reciterId === favItem.reciterId
          )
      )
    );
  }

  useEffect(
    function () {
      setFavourite(
        favourite.map((favItem) => {
          reciters.map((reciter) => {
            if (favItem.reciterId === reciter.id) {
              favItem.reciter = reciter.name;
            }
          });
          return favItem;
        })
      );
    },
    [lang, reciters]
  );

  function handleStart(favItem) {
    const link = `${favItem.currentReciter.server}${
      favItem.sura < 10
        ? `00${favItem.sura}`
        : favItem.sura >= 10 && favItem.sura < 100
        ? `0${favItem.sura}`
        : favItem.sura
    }.mp3`;
    setCurrentSurahIndex(favItem.sura);
    setCurrentSurah(link);
    setCheck(true);
    setPlayingReciter(favItem.currentReciter);
  }

  return (
    <div>
      <div className="grid grid-cols-1 select-none gap-4 border-gray-300 dark:border-gray-700 border rounded-lg p-5 mt-9 ">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsFavOpened((i) => !i)}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 my-4">
            {lang === "eng" ? "Favourites" : "المفضلة"}
          </h2>
          {!isFavOpened ? (
            <OpenListIcon moreStyle="mr-5 cursor-pointer" />
          ) : (
            <CloseListIcon moreStyle="mr-5 cursor-pointer" />
          )}
        </div>
        {isFavOpened &&
          favourite.map((favItem, index) => {
            return (
              <div
                key={favItem.sura + favItem.reciter}
                className="border border-gray-300 dark:border-gray-700 py-5 px-5 rounded-lg cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex-grow"
                    onClick={() => handleStart(favItem)}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-8 h-8 bg-blue-400 rotate-45 flex items-center justify-center text-white font-semibold rounded-lg shadow-md">
                        <span className="rotate-[-45deg]">{favItem.sura}</span>
                      </div>
                      <span
                        className={`font-bold  ${
                          lang === "ar" ? "font-quran text-5xl" : ""
                        }`}
                      >
                        {lang === "eng" ? "Sura " : "سورة "}{" "}
                        {allSurahs[favItem.sura - 1]?.name}
                      </span>
                    </div>
                    <div className="flex mt-3">
                      <span>{favItem.reciter}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <DownloadIcon
                      link={`${favItem.currentReciter.server}${
                        favItem.sura < 10
                          ? `00${favItem.sura}`
                          : favItem.sura >= 10 && favItem.sura < 100
                          ? `0${favItem.sura}`
                          : favItem.sura
                      }.mp3`}
                      title={
                        lang === "eng"
                          ? `Sura ${allSurahs[+favItem?.sura - 1]?.name} - ${
                              favItem.currentReciter?.name
                            }`
                          : `سورة ${allSurahs[+favItem?.sura - 1]?.name} - ${
                              favItem.currentReciter?.name
                            }`
                      }
                    />
                    <svg
                      onClick={() => handleRemove(favItem)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`size-6 text-red-600 fill-red-600 ${
                        false ? "text-red-600 fill-red-600" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
