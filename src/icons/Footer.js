import HeartIcon from "./HeartIcon";
import GithubIcon from "./GithubIcon.js";
import FacebookIcon from "./FacebookIcon.js";
import LinkedinIcon from "./LinkedinIcon.js";
import WhatsAppIcon from "./WhatsAppIcon.js";

export default function Footer({ lang }) {
  return (
    <footer className="sticky bottom-[-200px] shadow-md bg-[#E5E7EB]  dark:bg-gray-800 dark:text-slate-100 text-gray-800 py-4 text-center md:text-start">
      <div className="container mx-auto px-2 flex items-center justify-between flex-col md:flex-row gap-3">
        <p className="text-slate-800 dark:text-slate-200">
          {lang === "eng" ? (
            <span>
              Designed and developed with{" "}
              <HeartIcon moreClasses="size-6 mx-1.5 inline animate-ping fill-red-500 text-red-500" />{" "}
              by{" "}
              <a
                target="_blank"
                className="text-blue-400 font-bold"
                href="https://github.com/Mo3bassia"
              >
                Mohamed Abassia
              </a>{" "}
              - 2024 using{" "}
              <span className="text-blue-400 font-bold">React</span>
            </span>
          ) : (
            <span>
              تم التصميم والتطوير بكل{" "}
              <HeartIcon moreClasses="size-6 mx-1.5 inline animate-ping fill-red-500 text-red-500" />{" "}
              بواسطة{" "}
              <a
                target="_blank"
                className="text-blue-400 font-bold"
                href="https://github.com/Mo3bassia"
              >
                محمد عباسية
              </a>{" "}
              - 2024 باستخدام{" "}
              <span className="text-blue-400 font-bold">ريأكت</span>
            </span>
          )}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Mo3bassia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full shadow-md w-12 h-12 bg-slate-200 dark:bg-slate-800 cursor-pointer  hover:bg-slate-300 transition-colors dark:hover:bg-slate-700"
          >
            <GithubIcon moreClasses="fill-slate-800 dark:fill-slate-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamed-abassia-21b06232a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full shadow-md w-12 h-12 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:bg-slate-300 transition-colors dark:hover:bg-slate-700"
          >
            <LinkedinIcon moreClasses="fill-slate-800 dark:fill-slate-300" />
          </a>
          <a
            href="https://wa.me/+201099478375"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full shadow-md w-12 h-12 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:bg-slate-300 transition-colors dark:hover:bg-slate-700"
          >
            <WhatsAppIcon moreClasses="fill-slate-800 fill-slate-800 dark:fill-slate-300" />
          </a>
          <a
            href="https://www.facebook.com/moabassia.742005"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full shadow-md w-12 h-12 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:bg-slate-300 transition-colors dark:hover:bg-slate-700"
          >
            <FacebookIcon moreClasses="fill-slate-800 dark:fill-slate-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}
