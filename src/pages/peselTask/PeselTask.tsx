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

  //waga sumy kontrolnej
  const WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  const computeControlDigits = (digits: number[]): number => {
    const sum = digits.reduce((acc, v, i) => acc + v * WEIGHTS[i], 0);
    return (10 - (sum % 10)) % 10;
  };

  //zakodowujesz stulecie
  const parseBirthDate = (yy: number, mm: number, dd: number): Date | null => {
    let month = mm;
    let century;

    if (mm >= 1 && mm <= 12) {
      century = 1900;
    } else if (mm >= 21 && mm <= 32) {
      century = 2000;
      month = mm - 20;
    } else if (mm >= 41 && mm <= 52) {
      century = 2100;
      month = mm - 40;
    } else if (mm >= 61 && mm <= 72) {
      century = 2200;
      month = mm - 60;
    } else if (mm >= 81 && mm <= 92) {
      century = 1800;
      month = mm - 80;
    } else {
      return null;
    }

    const year = century + yy;
    // date w local timezone
    const createDate = new Date(year, month - 1, dd);
    //new Date(y, m, d)  koryguje wartosci poza zakresem zamiast rzucic blad, new Date(2025, 1, 30) (czyli 30 lutego) automatycznie przerobi na 2 marca 2025.
    if (
      createDate.getFullYear() !== year ||
      createDate.getMonth() !== month - 1 ||
      createDate.getDate() !== dd
    ) {
      return null;
    }
    return createDate;
  };

  const yyyymmdd = (date: Date) => {
    const y = date.getFullYear();
    //dopelniasz do dwoch cyfr 02, 05
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return Number(`${y}${m}${d}`);
  };

  const validatePesel = (pesel: string): PeselType => {
    if (typeof pesel !== "string")
      return { valid: false, error: "PESEL Musi byc stringiem" };
    const trimed = pesel.trim();
    if (!/^\d{11}$/.test(trimed))
      return { valid: false, error: "PESEL musi zawierac 11 cyfr" };

    const digits = trimed.split("").map((d) => Number(d));
    const yy = digits[0] * 10 + digits[1];
    const mm = digits[2] * 10 + digits[3];
    const dd = digits[4] * 10 + digits[5];

    const birthDate = parseBirthDate(yy, mm, dd);
    if (!birthDate)
      return { valid: false, error: "Nieprawidłowa data urodzenia" };

    const sumControl = computeControlDigits(digits.slice(0, 10));
    if (sumControl !== digits[10])
      return { valid: false, error: "Nieprawidłowa suma kontrolna" };

    //unikamy peseli z przyszlosci
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birthNum = yyyymmdd(birthDate);
    const todayNum = yyyymmdd(today);
    const minAllowedNum = 18000101;
    if (birthNum > todayNum)
      return { valid: false, error: "Jesteś z przyszłości ??" };
    if (birthNum < minAllowedNum)
      return {
        valid: false,
        error: "Pesel sprzed 1800 roku niedozwolnony,jestes wampirem?",
      };

    const sex = digits[9] % 2 === 1 ? "M" : "F";
    const iso = `${birthDate.getFullYear()}-${String(
      birthDate.getMonth() + 1
    ).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;

    return {
      valid: true,
      raw: trimed,
      birthDate,
      birthDateIso: iso,
      sex,
    };
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
