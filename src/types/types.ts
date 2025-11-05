export type PeselType =
  | { valid: false; error: string }
  | {
      valid: true;
      birthDate: Date;
      iso: string;
      sex: "M" | "F";
    };
