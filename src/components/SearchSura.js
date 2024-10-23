import { useEffect } from "react";

export default function SearchSura({
  query,
  setQuery,
  lang,
  currentReciters,
  allSurahs,
  findSurahs,
  setFindSurahs,
}) {
  //   console.log(currentReciters.surahs);
  //   console.log(allSurahs[+currentReciters.surahs]);

  //   useEffect(function () {
  //     setFindSurahs(
  //       findSurahs.map((sura) => {
  //         return { ...allSurahs[+sura - 1] };
  //       })
  //     );
  //   });

  function handleSearch(e) {
    setQuery(e.target.value);
    let arr = currentReciters.surahs.map((sura) => {
      return { ...allSurahs[+sura - 1] };
    });
    setFindSurahs(
      arr.filter((sura) => {
        let myName =
          lang !== "eng" && !sura.name.startsWith("سورة")
            ? "سورة " + sura.name
            : "sura " + sura.name;
        return myName
          .toLowerCase()
          .replaceAll("إ", "ا")
          .replaceAll("أ", "ا")
          .includes(
            e.target.value
              .toLowerCase()
              .replaceAll("إ", "ا")
              .replaceAll("أ", "ا")
          );
      })
    );
  }
  return (
    <input
      value={query}
      onChange={(e) => handleSearch(e)}
      placeholder={lang === "eng" ? "Search for Surah..." : "ابحث عن سورة..."}
      className="w-full px-4 py-2 border rounded-md focus:outline-none transition duration-300 ease-in-out 
     border-gray-300 dark:border-gray-600 
     bg-transparent 
     text-gray-900 dark:text-gray-200 
     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
     focus:border-blue-500 dark:focus:border-blue-400
     rtl:font-noto-arabic ltr:font-[Montserrat] my-5 disabled:opacity-20 mb-16"
    ></input>
  );
}
