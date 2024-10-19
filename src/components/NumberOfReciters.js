export default function NumberOfReciters({ lang, reciters }) {
  return (
    <h2 className="mt-9 text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
      {lang === "eng" ? (
        <span>
          Number of Quran reciters is
          <span className="bg-[#E5E7EB] dark:bg-gray-800 px-2 py-1.5 rounded-md mx-1.5">
            {reciters.length}
          </span>
          {reciters.length > 1 ? "reciters" : "reciter"}
        </span>
      ) : (
        <span>
          عدد القرآء هو
          <span className="bg-[#E5E7EB] dark:bg-gray-800 px-2  rounded-md mx-1.5">
            {reciters.length}
          </span>
          {reciters.length > 1 ? "قراء" : "قارئ"}
        </span>
      )}
    </h2>
  );
}
