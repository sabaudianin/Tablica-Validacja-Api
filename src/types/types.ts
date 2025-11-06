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

// export type UpdateUserInput = {
//   name?: string;
//   email?: string;
//   gender?: "male" | "female";
//   status?: "active" | "inactive";
// };

export type UpdateUserInput = Partial<
  Pick<User, "name" | "email" | "gender" | "status">
>;

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};
