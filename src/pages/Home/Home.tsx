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

        <div className="bg-blue-400/10 flex justify-center items-center font-bold text-xl rounded-3xl p-4 min-h-[50vh] static-background">
          Rafał Bobko
        </div>

        <div className=" hidden md:block   rounded-3xl static-sides"></div>
      </div>
      <a
        href="mailto:rafbobbob@vp.pl"
        className="col-span-full bg-white/20 p-4 font-bold rounded-3xl transition hover:underline "
      >
        rafbobbob@vp.pl
      </a>
    </div>
  );
};
