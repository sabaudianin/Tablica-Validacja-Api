import React, { useState, useEffect } from "react";
import type { User, FormProps } from "../../types/types";
import { Modal } from "../modal/Modal";
import { useEditUser } from "../../hooks/useEditUser";

export const EditUserForm: React.FC<FormProps> = ({
  open,
  onClose,
  user,
  onSaved,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const { updateUser, isEditing, error } = useEditUser({ onSuccess: onSaved });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setStatus(user.status);
    }
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim() || !email.trim()) return;
    try {
      await updateUser(user.id, { name, email, gender, status });
      onClose();
    } catch (error) {
      throw new Error(String(error));
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit user"
    >
      <form
        onSubmit={submit}
        className="space-y-2 pt-4"
      >
        <div>
          <label className=" font-semibold">Name</label>
          <input
            className=" w-full rounded border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className=" font-semibold">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-2 pb-4">
          <div className="flex-1">
            <label className="block font-semibold">Gender</label>
            <select
              className="mt-1 w-full rounded border p-2 bg-black"
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">Status</label>
            <select
              className="mt-1 w-full rounded border p-2 bg-black "
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "active" | "inactive")
              }
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name || !email || isEditing(user?.id ?? -1)}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-60"
          >
            {isEditing(user?.id ?? -1) ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
