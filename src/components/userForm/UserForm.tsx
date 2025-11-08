import React, { useEffect, useState } from "react";
import type { UserFormProps, Gender, Status } from "../../types/types";
import { Modal } from "../modal/Modal";

export const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  userToEdit,
  title,
  submitLabel,
  loading = false,
  error = null,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [status, setStatus] = useState<Status>("active");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setGender(userToEdit.gender as Gender);
      setStatus(userToEdit.status as Status);
    } else {
      setName("");
      setEmail("");
      setGender("male");
      setStatus("active");
    }
  }, [userToEdit, open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    await onSubmit({ name, email, gender, status });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
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
              onChange={(e) => setGender(e.target.value as Gender)}
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
              onChange={(e) => setStatus(e.target.value as Status)}
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
            disabled={!name || !email || loading}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
};
