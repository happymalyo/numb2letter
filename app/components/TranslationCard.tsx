import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Tanisa } from "tanisa";
import { animate } from "animejs";
import { ToWords } from "to-words";
import clsx from "clsx";

export const TranslationCard: FC = () => {
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

  // Animate the output letter when it changes
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
      <div className="w-[480px] p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl shadow-lg font-sans">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-1">
            Number to Letter Converter
          </h2>
          <p className="text-neutral-600">
            Enter a number to see its alphabetical equivalent
          </p>
          {/* Next: "Add icon above title for better visual indication" */}
        </div>

        <div className="relative mb-6">
          <input
            type="number"
            id="numberInput"
            placeholder="Enter a number (1-26)"
            className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-sm"
            min="1"
            max="26"
            onChange={handleInputNumber}
            value={inputNumber}
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            numbers
          </span>
          {/* Next: "Add validation indicator that changes color based on input validity" */}
        </div>

        <div className="flex items-center justify-center mb-5">
          <button
            onClick={translateNumber}
            className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-primary-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary-600">
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
              className="align-middle"
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

          {/* Next: "Add a table showing all number-letter mappings in a collapse section" */}
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
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
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
        <p className="my-5 text-slate-400 text-center">
          Created with ❤️ by{" "}
          <a href="https://x.com/happymalyo" className="font-bold">
            Mario Francisco
          </a>
        </p>
      </div>
    </div>
  );
};
