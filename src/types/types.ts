export type PeselType =
  | { valid: false; error: string }
  | {
      valid: true;
      birthDate: Date;
      iso: string;
      sex: "M" | "F";
    };

export type User = {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
};
