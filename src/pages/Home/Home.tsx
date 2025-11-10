import { NavLink } from "react-router";

export const Home = () => {
  return (
    <div className="grid gap-2 grid-rows-[auto_1fr_auto]  w-full">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/sabaudianin/Tablica-Validacja-Api"
        className="col-span-full bg-white/20 p-4 font-bold rounded-3xl  hover:bg-white/40 "
      >
        Link do Repozytorium
      </a>

      <div className="mx-auto gap-2  w-full grid  grid-cols-1 md:grid-cols-[120px_minmax(0,1fr)_120px] rounded-3xl">
        <div className="hidden md:block  rounded-3xl min-h-[50vh] static-sides"></div>

        <div className="bg-blue-400/10 flex flex-col justify-center gap-8 items-center font-bold text-xl rounded-3xl p-4 min-h-[50vh] static-background">
          <h2> Spis Tresci:</h2>
          <div className="text-xs">
            <p>
              <NavLink to="/tekst">LITEROPRZESTAWIACZ</NavLink>- losowo
              przestawia szyk liter w każdym wyrazie, oprócz pierwszej i
              ostatniej litery Pozwala na wpisanie dowolnego tekstu za pomocą
              formularza lub załadowanie pliku tekstowego.
            </p>
            <p className="my-4 md:my-16">
              <NavLink to="/pesel">PESELCHECKER </NavLink>- Aplikacja validująca
              poprawność numeru PESEL, po podaniu prawidłowego PESELU podaje
              datę urodzenia i płeć. Aplikacja przetestowana testami
              jednostkowymi przy pomocy VITEST.
            </p>
            <p>
              <NavLink to="/api">API CRUD</NavLink> - Implementacja CRUD w
              kontekście komunikacji z zewnętrznym API
            </p>
          </div>
        </div>

        <div className=" hidden md:block rounded-3xl static-sides"></div>
      </div>
      <a
        href="mailto:rafbobbob@gmail.com"
        className="col-span-full bg-white/20 p-4 font-bold rounded-3xl transition hover:underline "
      >
        rafbobbob@gmail.com
      </a>
    </div>
  );
};
