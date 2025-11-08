import React, { useState } from "react";
import type { User } from "../../types/types";
import { useGetUser } from "../../hooks/useGetUser";
import { useEditUser } from "../../hooks/useEditUser";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useCreateUser } from "../../hooks/useCreateUser";
import { UserForm } from "../../components/userForm/UserForm";

export const ApiTask: React.FC = () => {
  const { loading, error, users, refetch, query, setQuery } = useGetUser();

  const {
    updateUser,
    error: editError,
    isEditing,
  } = useEditUser({ onSuccess: refetch });

  const {
    create,
    isPending,
    error: createError,
  } = useCreateUser({ onSuccess: refetch });

  const {
    error: deleteError,
    removeUser,
    isDeleting,
  } = useDeleteUser({ onSuccess: refetch });

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  const openCreateModal = () => {
    setOpenCreate(true);
  };
  const openEditModal = (user: User) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const openDeleteModal = (user: User) => {
    setOpenDelete(true);
    setSelected(user);
  };
  return (
    <section className="w-full">
      <div className="w-full font-semibold flex gap-2 justify-center">
        <input
          placeholder="Search user by name..."
          className="w-full border text-center rounded p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-green-500/50 rounded p-2 w-1/3"
          onClick={openCreateModal}
        >
          Add User
        </button>
      </div>
      <h2 className="font-semibold p-1  mt-4">Go REST USERS LIST:</h2>
      {(editError || createError || deleteError) && (
        <div className="text-red-600 p-2">
          {editError ?? createError ?? deleteError}
        </div>
      )}
      {loading && <div className="animate-pulse p-2">... LOADING ...</div>}
      {error && <div className="text-red-500 font-semibold p-4">{error}</div>}

      {!loading && !error && (
        <ul className="w-full grid gap-1 lg:gap-4 sm:gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
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
                  onClick={() => openEditModal(user)}
                >
                  {isEditing(user.id) ? "Saving..." : "Edit"}
                </button>

                <button
                  className="p-1 px-2  bg-red-500/50 rounded"
                  onClick={() => openDeleteModal(user)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {openCreate && (
        <UserForm
          key="create"
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          userToEdit={null}
          title="Add User"
          mode="create"
          loading={isPending}
          error={createError}
          onSubmit={async (values) => {
            await create(values);
          }}
        />
      )}

      {openEdit && selected && (
        <UserForm
          key={selected.id}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          userToEdit={selected}
          mode="edit"
          title="Edit User"
          loading={isEditing(selected?.id)}
          error={editError}
          onSubmit={async (values) => updateUser(selected?.id, values)}
        />
      )}
      {openDelete && selected && (
        <UserForm
          key={selected.id}
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          userToEdit={selected}
          mode="delete"
          title="Delete User"
          loading={isDeleting(selected?.id)}
          error={deleteError}
          onSubmit={async () => removeUser(selected?.id)}
        />
      )}
    </section>
  );
};
