import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
  const nav = ({ isActive }: { isActive: boolean }) =>
    ` bg-white/10 rounded-xl p-2 md:px-12  ${
      isActive && "font-bold underline bg-white/30"
    }`;

  return (
    <div className="w-full min-h-[94dvh] max-w-6xl flex flex-col items-center mx-auto ">
      <nav className="w-full flex  items-center justify-between font-semibold">
        <NavLink
          to="/"
          className={nav}
        >
          📺
        </NavLink>
        <NavLink
          to="/tekst"
          className={nav}
        >
          Tekst Mix
        </NavLink>
        <NavLink
          to="/pesel"
          className={nav}
        >
          Pesel Check
        </NavLink>
        <NavLink
          to="/api"
          className={nav}
        >
          API List
        </NavLink>
      </nav>
      <hr className="my-4 w-full h-px border-0 bg-gray-200" />
      <main className="w-full min-h-0 flex-1 flex items-center justify-center  overflow-auto">
        <Outlet />
      </main>
      <footer className="w-full">
        <hr className="my-2 w-full h-px border-0 bg-gray-200" />
        Copyright &copy; {new Date().getFullYear()} Rafał Bobko
      </footer>
    </div>
  );
}
