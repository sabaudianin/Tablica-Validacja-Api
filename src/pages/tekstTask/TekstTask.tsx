import React, { useState } from "react";

export const TekstTask = () => {
  const [promptText, setPromptText] = useState("");
  const [cut, setCut] = useState(promptText);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Upload file , jakby nie działało na starych przegladarkach rozwazyc fileReader
  const readTextFile = async (file: File): Promise<string> => {
    return await file.text();
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      const text = await readTextFile(file);
      setPromptText(text);
    } catch (error) {
      console.log(error);
      setError("Nie udało się załądować pliku");
    } finally {
      setIsLoading(false);
      e.target.value = "";
    }
  };

  const handleMix = () => {
    setCut(cutText(promptText));
    setPromptText("");
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
      <h2 className="font-bold">LITEROPRZESTAWIACZ</h2>
      <h3 className="p-4">
        Wpisz tekst lub wczytaj plik tesktowy, następnie wciśnij przycisk aby
        zmienić kolejność liter. Twój przekształcony tekst pojawi się pod
        spodem.
      </h3>

      <div className="flex flex-col gap-2 items-center">
        <input
          id="inputId"
          className="sr-only"
          type="file"
          size={1024}
          onChange={uploadFile}
          accept=".txt,text/plain"
          disabled={isLoading}
        />
        <label
          htmlFor="inputId"
          className="p-2 bg-white/50 rounded m-2 font-semibold"
        >
          Wybierz Plik
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          value={promptText}
          placeholder="Tu wpisz text..."
          rows={5}
          onChange={(e) => setPromptText(e.target.value)}
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
