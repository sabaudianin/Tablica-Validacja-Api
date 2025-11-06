import React, { useState, useEffect } from "react";
import { apiGetUsers } from "../../api/apiMethods/apiGetUsers";
import type { User } from "../../types/types";

export const ApiTask: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiGetUsers<User[]>("/users?page=1");
        setUsers(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="p-2">
      <div className="max-w-md">
        <input
          placeholder="Search User"
          className="border text-center rounded p-2"
        />
      </div>
      <h2 className="font-semibold p-2">USERS LIST:</h2>
      {loading && <div className="animate-pulse p-2">... LOADING ...</div>}
      {error && <div className="text-red-500 font-semibold p-4">{error}</div>}

      {!loading && !error && (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.gender}</p>
              <p>{user.status}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
