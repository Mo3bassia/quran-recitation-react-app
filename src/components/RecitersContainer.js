import NumberOfReciters from "./NumberOfReciters.js";
import SearchReciter from "./SearchReciter.js";
import LoaderPost from "./LoaderPost.js";
import Reciter from "./Reciter.js";
import NotFound from "./NotFound.js";
import FavouriteSurahs from "./FavouriteSurahs.js";
import { useState } from "react";

export default function RecitersContainer({
  favourite,
  lang,
  setCheck,
  setPlayingReciter,
  reciters,
  allSurahs,
  searchedItems,
  setSearchedItems,
  isLoading,
  setCurrentSurahIndex,
  setCurrentSurah,
  setFavourite,
  setCurrentReciters,
}) {
  const [query, setQuery] = useState("");
  const checkSearchedEmpty = searchedItems.length === 0;

  return (
    <div
      className={`min-h-screen bg-[#F3F4F6] dark:bg-gray-900 text-gray-800 dark:text-gray-50 `}
    >
      <div className={`container mx-auto p-4 pt-6 md:p-6 lg:p-12`}>
        <FavouriteSurahs
          reciters={reciters}
          lang={lang}
          setPlayingReciter={setPlayingReciter}
          favourite={favourite}
          setFavourite={setFavourite}
          allSurahs={allSurahs}
          setCheck={setCheck}
          setCurrentSurah={setCurrentSurah}
          setCurrentSurahIndex={setCurrentSurahIndex}
        />
        <NumberOfReciters lang={lang} reciters={reciters} />
        <SearchReciter
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
  );
}
