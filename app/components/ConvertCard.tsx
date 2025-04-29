import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Tanisa } from "tanisa";
import { animate } from "animejs";
import { ToWords } from "to-words";
import clsx from "clsx";
import { GITHUB_REPO, X_ACCOUNT } from "~/constants";

export const ConvertCard: FC = () => {
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [outputLetter, setOutputLetter] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(16);
  const [localeCode, setLocalCode] = useState<string>("mg-MG");

  const handleInputNumber = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputNumber(value);
    },
    []
  );

  const handleReset = useCallback(() => {
    setInputNumber("");
    setOutputLetter("");
  }, []);

  const translateNumber = useCallback(() => {
    if (inputNumber === "") {
      setOutputLetter("");
      return;
    }

    // Handle MG tranlation
    const tanisa = new Tanisa();

    // Handle FR and EN
    const toWords = new ToWords({
      localeCode: localeCode,
    });

    if (localeCode === "mg-MG") {
      setOutputLetter(tanisa.toWords(Number(inputNumber)));
    } else {
      setOutputLetter(toWords.convert(Number(inputNumber)));
    }
  }, [inputNumber, localeCode]);

  const handleFontSizeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFontSize(Number(value));
    },
    []
  );

  useEffect(() => {
    if (outputLetter !== "") {
      animate("#result", {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }, [outputLetter]);

  const switchLang = useCallback((lang: string) => {
    setLocalCode(lang);
  }, []);

  useEffect(() => {
    translateNumber();
  }, [localeCode, inputNumber, translateNumber]);

  return (
    <div id="main">
      <div className="max-w-md w-full p-2 sm:p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl shadow-lg font-sans">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-1">
            Number to Letter Converter
          </h2>
          <p className="text-neutral-600 text-balance">
            Enter a number to see its alphabetical equivalent
          </p>
        </div>

        <div className="relative mb-6">
          <input
            type="number"
            id="numberInput"
            placeholder="Enter a number (1-26)"
            className="w-full px-4 py-2 sx:py-3 rounded-lg border-2 border-neutral-300 focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-sm"
            min="1"
            max="26"
            onChange={handleInputNumber}
            value={inputNumber}
          />
          <span
            className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
            translate="no"
          >
            numbers
          </span>
        </div>

        <div className="flex items-center justify-center mb-5">
          <button
            onClick={translateNumber}
            className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-primary-200 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-primary-600"
              translate="no"
            >
              arrow_downward
            </span>
          </button>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <p className="text-neutral-600 mb-2">The letter equivalent is:</p>
          {outputLetter !== "" ? (
            <span
              id="result"
              style={{ fontSize: `${fontSize}px` }}
              className="align-middle text-balance"
            >
              {outputLetter}
            </span>
          ) : (
            <div className="relative mx-auto w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-4 border-2 border-neutral-200 transition-all duration-500 hover:border-primary-300">
              <span
                id="result"
                className="text-6xl font-bold text-neutral-400 transition-all duration-300"
              >
                ?
              </span>
            </div>
          )}
        </div>
        <div className="m-6">
          <label
            htmlFor="fontSizeRange"
            className="block text-sm text-bold text-neutral-600 mb-2"
          >
            Adjust Font Size:
          </label>
          <input
            type="range"
            id="fontSizeRange"
            min="12"
            max="24"
            step="1"
            value={fontSize}
            onChange={handleFontSizeChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") translateNumber();
            }}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm" translate="no">
              refresh
            </span>
            Reset
          </button>
          <div className="flex justify-end mb-1">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-neutral-600">Language:</span>
              <button
                id="langMg"
                className={clsx(
                  "px-2 py-1 rounded",
                  localeCode === "mg-MG"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
                )}
                onClick={() => switchLang("mg-MG")}
              >
                MG
              </button>
              <button
                id="langFr"
                className={clsx(
                  "px-2 py-1 rounded",
                  localeCode === "fr-FR"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
                )}
                onClick={() => switchLang("fr-FR")}
              >
                FR
              </button>
              <button
                id="langEn"
                className={clsx(
                  "px-2 py-1 rounded",
                  localeCode === "en-IN"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
                )}
                onClick={() => switchLang("en-IN")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="my-5 text-slate-400 text-center flex justify-center space-x-2">
          <span>Created with ❤️ by </span>
          <a href={X_ACCOUNT} className="font-bold">
            Mario Francisco
          </a>
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
};
