export default function SearchInput({ lang, query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={lang === "eng" ? "Search..." : "ابحث..."}
      className="w-full px-4 py-2 border rounded-md focus:outline-none transition duration-300 ease-in-out 
     border-gray-300 dark:border-gray-600 
     bg-transparent 
     text-gray-900 dark:text-gray-200 
     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
     focus:border-blue-500 dark:focus:border-blue-400
     rtl:font-noto-arabic ltr:font-[Montserrat] my-5"
    ></input>
  );
}
