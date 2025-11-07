import { useState } from "react";
import { validatePesel } from "../../lib/validatePesel";

export const useCheckPesel = () => {
  const [pesel, setPesel] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    error?: string;
    birth?: string;
    sex?: string;
  } | null>(null);

  const handleCheck = () => {
    const res = validatePesel(pesel);
    if (res.valid) {
      setResult({ valid: true, birth: res.iso, sex: res.sex });
    } else {
      setResult({ valid: false, error: res.error });
    }
  };
  return {
    setPesel,
    pesel,
    result,
    handleCheck,
  };
};
