import React from "react";
import * as wanakana from "wanakana";

function WordCard({ word }) {
  const reading = word.reading || "";

  const romajiWithSpaces = reading
    .split("")
    .map((kana) => wanakana.toRomaji(kana))
    .join(" ");

  return (
    <div className="mt-8 p-6 bg-white/40 backdrop-blur-md rounded-xl shadow-lg w-full sm:w-96 mx-auto border border-white/30">
      <p className="text-xl font-semibold text-gray-800">
        <strong>漢字：</strong> {word.expression}
      </p>
      <p className="text-lg text-gray-700 mt-2">
        <strong>讀音：</strong> {reading}
      </p>
      <p className="text-lg text-gray-700 mt-2">
        <strong>羅馬拼音：</strong> {romajiWithSpaces}
      </p>
      <p className="text-lg text-gray-700 mt-2">
        <strong>意思：</strong> {word.meaning}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        <strong>標籤：</strong> {word.tags}
      </p>
    </div>
  );
}

export default WordCard;
