import { useEffect } from "react";

export default function RangeInput({
  max,
  min,
  value,
  onChange,
  height,
  currentPercent,
  lang,
}) {
  return (
    <input
      max={max}
      min={min}
      value={value}
      onChange={(e) => onChange(e)}
      type="range"
      style={{
        height: height,
        "--value": `${currentPercent}%`,
      }}
      lang={lang}
      className={`appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[9px] [&::-webkit-slider-thumb]:w-[10px] cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::webkit-progress-value]:bg-slate-600 [&::-webkit-slider-thumb]:bg-purple-500 w-12 h-4`}
    ></input>
  );
}
