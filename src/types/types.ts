export type PeselType =
  | { valid: false; error: string }
  | {
      valid: true;
      birthDate: Date;
      iso: string;
      sex: "M" | "F";
    };

export type Gender = "male" | "female";
export type Status = "active" | "inactive";

export type User = {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
};

export type UserState = {
  loading: boolean;
  error: string | null;
  users: User[];
  page: number;
  reload: boolean;
  query: string;
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

export interface CreateUserInput {
  name: string;
  email: string;
  gender: Gender;
  status: Status;
}

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export type FormProps = {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSaved: () => void;
};

export interface UserFormType {
  name: string;
  email: string;
  gender: Gender;
  status: Status;
}

export type FormMode = "create" | "edit" | "delete";

export type UserFormProps = {
  open: boolean;
  onClose: () => void;
  mode: FormMode;
  userToEdit?: User | null;
  loading?: boolean;
  error?: string | null;
  confirmByEmail?: boolean;
  onSubmit: (value: UserFormType) => Promise<void> | void;
};
