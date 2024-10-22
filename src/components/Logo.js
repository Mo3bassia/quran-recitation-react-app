import QuranSvg from "./QuranSvg";

export default function Logo({ lang }) {
  return (
    <a
      className=" font-bold text-xl sm:text-xl md:text-2xl lg:text-4xl flex items-center gap-5"
      href="#"
    >
      <QuranSvg size={40} />
      <span>{lang === "eng" ? "Quran Recitation" : "صوت القرآن"}</span>
    </a>
  );
}
