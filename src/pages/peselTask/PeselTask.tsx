import React, { useState } from "react";

type PeselType =
  | { valid: false; error: string }
  | {
      valid: true;
      raw: string;
      birthDate: Date;
      birthDateIso: string;
      sex: "M" | "F";
    };

export const PeselTask = () => {
  const [pesel, setPesel] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    error?: string;
    birth?: string;
    sex?: string;
  } | null>(null);

  const validatePesel = (pesel: string) => {
    return pesel;
  };
  const handleCheck = () => {
    const res = validatePesel(pesel);
    if (res.valid) {
      setResult({ valid: true, birth: res.birthDateIso, sex: res.sex });
    } else {
      setResult({ valid: false, error: res.error });
    }
  };
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
        className="border rounded p-3"
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
            <div>
              <p>PESEL PRAWIDŁOWY</p>
              <p>DATA URODZENIA {result.birth}</p>
              <p>PŁEĆ {result.sex}</p>
            </div>
          ) : (
            <p>BŁĄD {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};
