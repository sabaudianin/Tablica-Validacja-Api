import React, { useState } from "react";

export const TekstTask = () => {
  const [promptText, setpromptText] = useState("");
  const [cut, setCut] = useState(promptText);

  const handleMix = () => {
    setCut(cutText(promptText));
    setpromptText("");
  };

  const mixWord = (word: string): string => {
    //edge case
    if (word.length < 3) return word;

    const first = word[0];
    const last = word[word.length - 1];
    const inside = [...word.slice(1, -1)];

    for (let i = inside.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [inside[i], inside[j]] = [inside[j], inside[i]];
    }
    return first + inside.join("") + last;
  };

  const cutText = (text: string): string => {
    const whiteMarks = text.match(/[\p{L}’'-]+|[^\p{L}\s]+|\s+/gu) ?? [];
    return whiteMarks
      .map((mark) => (/\p{L}/u.test(mark) ? mixWord(mark) : mark))
      .join("");
  };

  return (
    <div className="w-full text-center">
      <h2 className="font-bold">ZADANIE 1</h2>
      <h3 className="p-4">
        Wpisz tekst i wciśnij przycisk aby zmienić kolejność liter,
        przekształcony tekst pojawi się pod spodem.
      </h3>
      <div className="flex flex-col gap-2 items-center">
        <textarea
          value={promptText}
          placeholder="Tu wpisz text..."
          rows={5}
          onChange={(e) => setpromptText(e.target.value)}
          className="border w-full rounded p-1 text-center"
        ></textarea>
        <button
          onClick={handleMix}
          className="rounded m-2 p-2 bg-green-300/50 w-1/4 text-center font-semibold"
        >
          Mixuj
        </button>
        <p className="font-semibold">{cut}</p>
      </div>
    </div>
  );
};
