import axios from "axios";
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

  function handleDownload() {
    const title =
      lang === "eng"
        ? `Sura ${allSurahs[+sura - 1].name} - ${currentReciters.name}`
        : `سورة ${allSurahs[+sura - 1].name} - ${currentReciters.name}`;

    const handleDownload = async () => {
      try {
        const response = await axios.get(
          `${currentReciters.server}${sura}.mp3`,
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title.trim()}.mp3`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    };
    handleDownload();
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 hover:text-green-400"
        onClick={handleDownload}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
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
