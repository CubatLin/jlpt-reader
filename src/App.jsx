import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import WordCard from "./components/WordCard";

const levels = ["n1", "n2", "n3", "n4", "n5"];

function App() {
  const [selectedLevel, setSelectedLevel] = useState("n1");
  const [word, setWord] = useState(null);
  const [rate, setRate] = useState(0.6);

  // 初始化時就隨機抽字
  useEffect(() => {
    handleRead();
  }, [selectedLevel]);

  const handleRead = async () => {
    const res = await fetch(`/${selectedLevel}.csv`);
    const text = await res.text();

    const data = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
    }).data;

    const random = data[Math.floor(Math.random() * data.length)];
    setWord(random);

    speakJapanese(random.reading);
  };

  const handleRepeat = () => {
    if (word) {
      speakJapanese(word.reading);
    }
  };

  const speakJapanese = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    const voices = speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang === "ja-JP");
    if (jaVoice) utterance.voice = jaVoice;
    speechSynthesis.speak(utterance);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4">
      <h1 className="text-xl font-extrabold text-white drop-shadow-lg text-center mb-6 whitespace-nowrap">
        🇯🇵 JLPT Reader
      </h1>

      <div className="mb-4">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center gap-4 mb-4 w-full sm:w-auto">
        <button
          onClick={handleRead}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          pick a word
        </button>
        <button
          onClick={handleRepeat}
          disabled={!word}
          className="bg-green-500 text-white py-3 px-6 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          repeat
        </button>
      </div>

      <div className="w-full mb-6">
        <label className="block text-sm text-gray-700 mb-2">語速：{rate.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {word && <WordCard word={word} />}

      <footer className="mt-8 py-4 w-full text-center text-xs text-white drop-shadow">
        <p>© Copyright {currentYear} Ethan Wu</p>
      </footer>
    </div>
  );
}

export default App;
