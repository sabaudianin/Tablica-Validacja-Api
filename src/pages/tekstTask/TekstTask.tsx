import React, { useState } from "react";

export const TekstTask = () => {
  const [promptText, setpromptText] = useState("");

  const mixWord = (word: string): string => {
    if (word.length < 3) return word;
    const first = word[0];
    const last = word[word.length - 1];
    const inside = word.slice(1, -1).split("");
    for (let i = inside.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [inside[i], inside[j]] = [inside[j], inside[i]];
    }
    return first + inside.join("") + last;
  };
  return (
    <div>
      <h2>TekstTask</h2>

      <form>
        <textarea>Wpisz tekst</textarea>
      </form>
    </div>
  );
};
