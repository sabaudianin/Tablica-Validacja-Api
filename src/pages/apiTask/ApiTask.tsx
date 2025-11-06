import React, { useState } from "react";
import type { User } from "../../types/types";
import { useGetUser } from "../../hooks/useGetUser";
import { useEditUser } from "../../hooks/useEditUser";
import { EditUserForm } from "../../components/editUserForm/EditUserForm";

export const ApiTask: React.FC = () => {
  const { loading, error, users, refetch } = useGetUser();
  const { error: editError, isEditing } = useEditUser({ onSuccess: refetch });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  return (
    <section className="w-full">
      <div className="font-semibold">
        <h3>SEARCH USER LIST</h3>
        <input
          placeholder="Write user name"
          className="border text-center rounded p-2"
        />
      </div>
      <h2 className="font-semibold p-2">USERS LIST:</h2>
      {loading && <div className="animate-pulse p-2">... LOADING ...</div>}
      {error && <div className="text-red-500 font-semibold p-4">{error}</div>}

      {!loading && !error && (
        <ul className="w-full grid gap-1 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          {users.map((user) => (
            <li
              key={user.id}
              className="border p-1"
            >
              <p className="text-sm">{user.name}</p>
              <p>{user.email}</p>
              <p className="capitalize">
                {user.gender} - {user.status}
              </p>
              <div className="flex gap-4 justify-center items-center p-2 font-semibold">
                <button
                  disabled={isEditing(user.id)}
                  className="py-1 px-2 bg-blue-500/50 rounded disabled:opacity-90"
                  onClick={() => {
                    setSelected(user);
                    setOpen(true);
                  }}
                >
                  {isEditing(user.id) ? "Saving..." : "Edit"}
                </button>

                <button className="p-1 px-2  bg-red-500/50 rounded">
                  Delete
                </button>
                {editError && (
                  <div className="text-red-600 p-2">{editError}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <EditUserForm
        open={open}
        onClose={() => setOpen(false)}
        user={selected}
        onSaved={refetch}
      />
    </section>
  );
};
