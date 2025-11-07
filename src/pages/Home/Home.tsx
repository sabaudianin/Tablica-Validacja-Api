import React from "react";

export const Home = () => {
  return (
    <div className="grid gap-2 grid-rows-[auto_1fr_auto]  w-full">
      <div className="col-span-full bg-white/20 p-4 font-bold rounded-3xl">
        Zadania Rekrutacyjne
      </div>
      <div className="mx-auto gap-2  w-full grid  grid-cols-1 md:grid-cols-[120px_minmax(0,1fr)_120px] rounded-3xl">
        <div className="hidden md:block bg-black/10 rounded-3xl min-h-[50vh]"></div>

        <div className="bg-blue-400/10 flex justify-center items-center font-bold text-xl rounded-3xl p-4 min-h-[50vh]">
          Rafał Bobko
        </div>

        <div className=" hidden md:block bg-black/10  rounded-3xl"></div>
      </div>
      <div className="col-span-full bg-white/20 p-4 font-bold rounded-3xl">
        rafbobbob@vp.pl
      </div>
    </div>
  );
};
