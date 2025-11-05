import React from "react";
import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
  const nav = ({ isActive }: { isActive: boolean }) =>
    ` bg-white/10 rounded-xl p-2  ${
      isActive && "font-bold underline bg-white/30"
    }`;

  return (
    <div className="w-full h-screen max-w-6xl flex flex-col justify-center items-center mx-auto">
      <nav className="w-full flex  items-center justify-between font-semibold">
        <NavLink
          to="/"
          className={nav}
        >
          HOME
        </NavLink>
        <NavLink
          to="/tekst"
          className={nav}
        >
          1-TEKST
        </NavLink>
        <NavLink
          to="/pesel"
          className={nav}
        >
          2-PESEL
        </NavLink>
        <NavLink
          to="/api"
          className={nav}
        >
          3-API
        </NavLink>
      </nav>
      <main className="flex-1 flex items-center justify-center w-full">
        <Outlet />
      </main>
      <footer className="w-full">
        <hr className="p-2" />
        Copyright &copy; {new Date().getFullYear()} Rafał Bobko
      </footer>
    </div>
  );
}
