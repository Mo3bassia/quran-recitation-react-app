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
  currentSurah,
  playingReciter,
}) {
  const link = `${currentReciters.server}${sura}.mp3`;

  function handleClick(e) {
    setCurrentSurahIndex(sura);
    setCurrentSurah(link);
    setCheck(true);
    setPlayingReciter(currentReciters);
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

  return (
    <div
      className={`flex gap-5 items-center   mb-6 dark:border-slate-600 border-b-2 pb-6 justify-between cursor-pointer`}
    >
      <p
        className={`${
          lang !== "eng" ? "font-quran text-5xl" : "text-xl lg:text-2xl"
        } flex-grow hover:text-blue-400 ${
          currentSurah === sura && playingReciter.name === currentReciters.name
            ? "text-blue-400"
            : ""
        }`}
        onClick={(e) => handleClick(e)}
        key={sura}
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
    </div>
  );
}
