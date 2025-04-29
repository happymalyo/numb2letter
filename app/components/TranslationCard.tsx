import { FC } from "react";

export const TranslationCard: FC = () => {
  return (
    <div id="webcrumbs">
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
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            numbers
          </span>
          {/* Next: "Add validation indicator that changes color based on input validity" */}
        </div>

        <div className="flex items-center justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-primary-200 cursor-pointer">
            <span className="material-symbols-outlined text-primary-600">
              arrow_downward
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <p className="text-neutral-600 mb-2">The letter equivalent is:</p>
          <div className="relative mx-auto w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-4 border-2 border-neutral-200 transition-all duration-500 hover:border-primary-300">
            <span
              id="result"
              className="text-6xl font-bold text-neutral-400 transition-all duration-300"
            >
              ?
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            <span className="material-symbols-outlined text-xs align-middle mr-1">
              info
            </span>
            Numbers 1-26 correspond to letters A-Z
          </p>
          {/* Next: "Add a table showing all number-letter mappings in a collapse section" */}
        </div>

        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-all duration-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Reset
          </button>
          <div className="flex justify-end mb-1">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-neutral-600">Language:</span>
              <button
                id="langEn"
                className="px-2 py-1 rounded bg-primary-500 text-white"
              >
                EN
              </button>
              <button
                id="langEs"
                className="px-2 py-1 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
