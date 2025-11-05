import React from "react";
import { useCheckPesel } from "../../hooks/useCheckPesel";

export const PeselTask = () => {
  const { setPesel, pesel, result, handleCheck } = useCheckPesel();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="font-bold">ZADANIE 2</h2>
      <label className="font-bold m-4 text-2xl">PESEL</label>

      <input
        value={pesel}
        placeholder="Wpisz Pesel tutaj ..."
        onChange={(e) =>
          setPesel(e.target.value.replace(/\D/g, "").slice(0, 11))
        }
        className="border rounded p-3 text-center"
      />
      <button
        onClick={handleCheck}
        className="bg-green-300/50 p-3 rounded-xl m-4 font-semibold"
      >
        Sprawdz Pesel
      </button>

      {result && (
        <div>
          {result.valid ? (
            <div className="font-bold space-y-2">
              <p className="text-green-500">PESEL PRAWIDŁOWY</p>
              <p>DATA URODZENIA: {result.birth}</p>
              <p>PŁEĆ: {result.sex}</p>
            </div>
          ) : (
            <p className="font-bold text-red-500">BŁĄD {result.error} !!</p>
          )}
        </div>
      )}
    </div>
  );
};
